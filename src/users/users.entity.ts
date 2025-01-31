import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/roles/roles.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

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