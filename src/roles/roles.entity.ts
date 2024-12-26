import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enums/user-role";
import { Users } from "src/users/users.entity";

@Entity()
export class Roles {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @ManyToMany(() => Users, (users) => users.roles)
    @JoinTable()
    users: Users[];
}