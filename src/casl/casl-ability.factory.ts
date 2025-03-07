import { Ability, AbilityBuilder, AbilityClass, defineAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "./enums/casl-action";
import { Users } from "src/users/users.entity";
import { UserRole } from "src/roles/enums/user-role";

export type Subjects = "Users" | "Validate" | "Address" | "Products" | "Category" |"all";

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Users) {
    const ability = defineAbility((can) => {
      for(const role of user.roles) {
        for(const permission of role.permissions) {
          if(permission?.conditions) {
            can(
              permission.action, 
              permission.subject,
              this.buildCaslConditions(permission.conditions)
            )
          } else {
            can(
              permission.action, 
              permission.subject
            )
          }
        }
      }
    })

    return ability;
  }

  private buildCaslConditions(conditions: any) {
    // Handle null/undefined case
    if (!conditions) {
      return {};
    }
  
    // Simple condition case
    if (conditions.fields && conditions.matcher && conditions.value !== undefined) {
      const field = conditions.fields[0];
      
      switch (conditions.matcher) {
        case 'equals':
          if (conditions.value === "true") return { [field]: true };
          if (conditions.value === "false") return { [field]: false };
          // Handle numeric strings
          if (!isNaN(conditions.value) && typeof conditions.value === 'string') {
            return { [field]: Number(conditions.value) };
          }
          return { [field]: conditions.value };
      
        case 'includes':
          return { [field]: { $in: Array.isArray(conditions.value) ? conditions.value : [conditions.value] } };
            
        case 'startsWith':
          return { [field]: { $regex: `^${conditions.value}` } };
            
        default:
          return { [field]: conditions.value };
      }
    }
    
    // Complex rules with AND/OR operators
    if (conditions.rules && conditions.rules.length > 0) {
      const conditionsList = conditions.rules.map(rule => {
        // Create a simple condition format from each rule
        return this.buildCaslConditions({
          fields: [rule.field],
          matcher: rule.matcher,
          value: rule.value
        });
      });
      
      // Handle empty results from rule processing
      const validConditions = conditionsList.filter(c => Object.keys(c).length > 0);
      
      if (validConditions.length === 0) {
        return {};
      }
      
      if (conditions.operator === 'or') {
        return { $or: validConditions };
      } else {
        return { $and: validConditions };
      }
    }
    
    // Return empty object if no recognized format
    return {};
  }
}