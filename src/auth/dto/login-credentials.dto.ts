import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginCredentialsDto {
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}