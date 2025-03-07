import { Subjects } from "src/casl/casl-ability.factory";
import { Action } from "src/casl/enums/casl-action";
import { BaseEntity } from "src/database/base-entity.entity";
import { Roles } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permissions extends BaseEntity {
    @Column({
        type: "enum",
        enum: Action
    })
    action: Action;

    @Column()
    subject: Subjects;

    @Column({
        type: "json",
        nullable: true
    })
    conditions: {
        fields?: string[];
        matcher?: 'equals' | 'includes' | 'startsWith';
        value?: any;
        operator?: 'and' | 'or';
        rules?: Array<{
          field: string;
          matcher: string;
          value: any;
        }>;
    }

    @ManyToMany(() => Roles, (roles) => roles.permissions)
    @JoinTable()
    roles: Roles[];
}