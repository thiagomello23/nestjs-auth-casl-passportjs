import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {

    constructor(
        private usersService: UsersService
    ){}

    @Post("signUp")
    async signUp(
        @Body() createUser: CreateUserDto
    ) {
        return this.usersService.createUser(createUser)
    }

}