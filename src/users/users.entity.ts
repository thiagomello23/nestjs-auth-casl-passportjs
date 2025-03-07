import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/base-entity.entity";
import { Roles } from "src/roles/roles.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ManyToMany(() => Roles, (roles) => roles.users)
    roles: Roles[];
}