import { Action } from "src/casl/enums/casl-action";
import { UserRole } from "src/roles/enums/user-role";
import { Roles } from "src/roles/roles.entity";
import { Users } from "src/users/users.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "src/permissions/permissions.entity";
import * as bcrypt from "bcrypt"
import "dotenv/config";

export class CreateSeed1738584956182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const res = await queryRunner.manager
            .getRepository(Users)
            .createQueryBuilder("users")
            .where("users.email = :email", {email: `${process.env.ADMIN_EMAIL}`})
            .getOne()

        if(res) {
            console.log("Seed has already been executed!")
            return;
        }

        const adminRole = new Roles();
        adminRole.role = UserRole.ADMIN

        const userReadPermission = new Permissions()
        userReadPermission.action = Action.Read
        userReadPermission.subject = "Users"

        await queryRunner.manager.save(Permissions, userReadPermission)

        adminRole.permissions = [userReadPermission]

        const userRole = new Roles();
        userRole.role = UserRole.USER

        userRole.permissions = [userReadPermission]

        await queryRunner.manager.save(Roles, [adminRole, userRole])

        const user = new Users()
        user.name = `${process.env.ADMIN_NAME}`
        user.email = `${process.env.ADMIN_EMAIL}`
        const password = `${process.env.ADMIN_PASSWORD}`

        const cripted = await bcrypt.hash(password, +process.env.BCRYPT_SALT)

        user.password = cripted

        user.roles = [adminRole, userRole]

        await queryRunner.manager.save(Users, user)

        console.log("Seed run with success!")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}