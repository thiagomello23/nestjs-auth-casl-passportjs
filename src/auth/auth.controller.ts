import { BadRequestException, Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
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
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}

    @Post("signUp")
    @ApiBody({type: CreateUserDto})
    @ApiOkResponse({description: "User created with success!", type: Users})
    @ApiBadRequestResponse({description: "User email already been used!"})
    async signUp(
        @Body() createUser: CreateUserDto
    ) {
        return this.usersService.createUser(createUser)
    }

    @Post("login")
    @ApiBody({type: LoginCredentialsDto})
    @ApiOkResponse({description: "Returns a JWT Payload!", example: {sub: "1", email: "test@gmail.com"}})
    @ApiUnauthorizedResponse({description: "Email or password invalid!"})
    async login(
        @Body() loginCredentials: LoginCredentialsDto
    ) {
        return this.authService.login(loginCredentials)
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, "Users"))
    @Get("validate")
    @ApiResponse({description: "returns a user by it's JWT payload!", type: Users})
    @ApiUnauthorizedResponse({description: "Invalid JWT or invalid jwt user payload!"})
    async validateUser(
        @Req() request
    ) {
        return request.user
    }
}