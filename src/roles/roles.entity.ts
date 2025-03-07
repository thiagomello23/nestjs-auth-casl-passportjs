import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enums/user-role";
import { Users } from "src/users/users.entity";
import { Permissions } from "src/permissions/permissions.entity";
import { BaseEntity } from "src/database/base-entity.entity";

@Entity()
export class Roles extends BaseEntity {
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @ManyToMany(() => Users, (users) => users.roles)
    @JoinTable()
    users: Users[];

    @ManyToMany(() => Permissions, (permissions) => permissions.roles)
    permissions: Permissions[];
}