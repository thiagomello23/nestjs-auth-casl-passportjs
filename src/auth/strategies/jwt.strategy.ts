import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DatabaseRepositoryConstants, JwtStrategyName } from "src/constants";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {

    constructor(
        @Inject(DatabaseRepositoryConstants.usersRepository)
        private usersRepository: Repository<Users>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
          });
    }

    async validate(payload: JwtPayload) {
        // this return to req.user
        const user = await this.usersRepository.findOne({
            where: {
                id: payload.sub
            },
            relations: {
                roles: {
                    permissions: true
                },
            }
        })
        if(!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
