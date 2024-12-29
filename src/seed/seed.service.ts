import { Inject, Injectable } from "@nestjs/common";
import { DatabaseRepositoryConstants } from "src/constants";
import { UserRole } from "src/roles/enums/user-role";
import { Roles } from "src/roles/roles.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"

@Injectable()
export class SeedService {

    constructor(
        @Inject(DatabaseRepositoryConstants.usersRepository)
        private usersRepository: Repository<Users>,
        @Inject(DatabaseRepositoryConstants.rolesRepository)
        private rolesRepository: Repository<Roles>
    ){}

    async seed() {
        const res = await this.usersRepository.findOne({
            where: {
                email: "example@gmail.com"
            }
        })

        if(res) {
            console.log("Seed has already been executed!")
            return;
        }

        const adminRole = new Roles();
        adminRole.role = UserRole.ADMIN

        const userRole = new Roles();
        userRole.role = UserRole.USER

        await this.rolesRepository.save([adminRole, userRole])

        const user = new Users()
        user.name = "example"
        user.email = "example@gmail.com"
        const password = "123"

        const cripted = await bcrypt.hash(password, +process.env.BCRYPT_SALT)

        user.password = cripted

        user.roles = [adminRole]

        await this.usersRepository.save(user)

        console.log("Seed run with success!")
    }
}