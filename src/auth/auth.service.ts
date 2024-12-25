import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from "bcrypt"
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { DatabaseRepositoryConstants } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'types';

@Injectable()
export class AuthService {

    constructor(
        @Inject(DatabaseRepositoryConstants.usersRepository)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ){}

    async login(loginCredentials: LoginCredentialsDto) {
        // Basic Validation
        const existingUser = await this.usersRepository.findOne({
            where: {
                email: loginCredentials.email
            }
        })

        if(!existingUser) {
            throw new UnauthorizedException("Email or password invalid!")
        }

        const validatePass = await bcrypt.compare(loginCredentials.password, existingUser.password)

        if(!validatePass) {
            throw new UnauthorizedException("Email or password invalid!")
        }

        const payload: JwtPayload = {
            sub: existingUser.id,
            email: existingUser.email
        }

        // Generating JWT token
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET
            })
        }
    }
}
