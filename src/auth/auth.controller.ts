import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { PoliciesGuard } from "./policies.guard";
import { CheckPolicies } from "./decorators/check-policies.decorator";
import { AppAbility } from "src/casl/casl-ability.factory";
import { Action } from "src/casl/enums/casl-action";
import { Users } from "src/users/users.entity";

@Controller("auth")
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}

    @Post("signUp")
    async signUp(
        @Body() createUser: CreateUserDto
    ) {
        return this.usersService.createUser(createUser)
    }

    @Post("login")
    async login(
        @Body() loginCredentials: LoginCredentialsDto
    ) {
        return this.authService.login(loginCredentials)
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, "Users"))
    @Get("validate")
    async validateUser(
        @Req() request
    ) {
        return request.user
    }
}