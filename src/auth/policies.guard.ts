import { ForbiddenError, subject } from "@casl/ability";
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory, Subjects } from "src/casl/casl-ability.factory";
import { Action } from "src/casl/enums/casl-action";
import { CHECK_POLICIES_KEY, DatabaseRepositoryConstants, IS_PUBLIC_KEY } from "src/constants";
import { DataSource } from "typeorm";

export interface PolicyHandler {
    action: Action;
    subject: Subjects;
    getSubject?: (context: ExecutionContext, dataSource: DataSource) => any;
}

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
        @Inject(DatabaseRepositoryConstants.dataSource)
        private readonly dataSource: DataSource,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) {
            return true;
        }
        
        const policyHandlers = this.reflector.get<PolicyHandler[]>(
            CHECK_POLICIES_KEY,
            context.getHandler(),
        ) || [];

        const { user } = context.switchToHttp().getRequest()
        const ability = this.caslAbilityFactory.createForUser(user);

        for(const p of policyHandlers) {
            try {
                if(p?.getSubject) {
                    ForbiddenError
                        .from(ability)
                        .throwUnlessCan(
                            p.action,
                            subject(
                                p.subject,
                                await p?.getSubject(context, this.dataSource),
                            )
                        )
                } else {
                    ForbiddenError
                        .from(ability)
                        .throwUnlessCan(
                            p.action,
                            p.subject
                        )
                }
            }catch(err) {
                throw new UnauthorizedException()
            }
        }

        return true
    }
}