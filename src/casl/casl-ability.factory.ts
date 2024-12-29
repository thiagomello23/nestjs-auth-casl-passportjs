import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "./enums/casl-action";
import { Users } from "src/users/users.entity";
import { UserRole } from "src/roles/enums/user-role";

type Subjects = InferSubjects<typeof Users> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Users) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    for(const r of user.roles) {
      if(r.role === UserRole.ADMIN) {
        can(Action.Read, Users)
      }
      if(r.role === UserRole.USER) {
        can(Action.Read, Users)
      }
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}