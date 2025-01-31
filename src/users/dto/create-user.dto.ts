import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: "username"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "test@gmail.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "123"})
    @IsString()
    @IsNotEmpty()
    password: string;
}