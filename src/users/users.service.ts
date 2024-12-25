import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { DatabaseRepositoryConstants } from 'src/constants';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {

    constructor(
        @Inject(DatabaseRepositoryConstants.usersRepository)
        private usersRepository: Repository<Users>
    ){}

    async createUser(createUser: CreateUserDto) {
        const newUser = new Users();

        const existingUser = await this.usersRepository.findOne({
            where: {
                email: createUser.email
            }
        })

        if(existingUser) {
            throw new BadRequestException("User email already beeing used;")
        }

        const criptPassword = await bcrypt.hash(createUser.password, +process.env.BCRYPT_SALT)

        newUser.email = createUser.email
        newUser.name = createUser.name
        newUser.password = criptPassword

        return await this.usersRepository.save(newUser)
    }
}
