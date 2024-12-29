import { Subjects } from "src/casl/casl-ability.factory";
import { Action } from "src/casl/enums/casl-action";
import { Roles } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: Action
    })
    action: Action;

    @Column()
    subject: Subjects;

    @ManyToMany(() => Roles, (roles) => roles.permissions)
    @JoinTable()
    roles: Roles[];
}