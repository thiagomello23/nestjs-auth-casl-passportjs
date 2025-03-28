import { BadRequestException, Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { AuthService } from "./auth.service";
import { CheckPolicies } from "./decorators/check-policies.decorator";
import { Action } from "src/casl/enums/casl-action";
import { Users } from "src/users/users.entity";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Public } from "./decorators/is-public.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}

    @Post("signUp")
    @Public()
    @ApiBody({type: CreateUserDto})
    @ApiOkResponse({description: "User created with success!", type: Users})
    @ApiBadRequestResponse({description: "User email already been used!"})
    async signUp(
        @Body() createUser: CreateUserDto
    ) {
        return this.usersService.createUser(createUser)
    }

    @Post("login")
    @Public()
    @ApiBody({type: LoginCredentialsDto})
    @ApiOkResponse({description: "Returns a JWT Payload!", example: {sub: "1", email: "test@gmail.com"}})
    @ApiUnauthorizedResponse({description: "Email or password invalid!"})
    async login(
        @Body() loginCredentials: LoginCredentialsDto
    ) {
        return this.authService.login(loginCredentials)
    }

    @CheckPolicies({
        action: Action.Read,
        subject: "Users"
    })
    @Get("validate")
    @ApiResponse({description: "returns a user by it's JWT payload!", type: Users})
    @ApiUnauthorizedResponse({description: "Invalid JWT or invalid jwt user payload!"})
    async validateUser(
        @Req() request
    ) {
        return request.user
    }
}