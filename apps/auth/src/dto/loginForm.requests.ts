import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginFormDTO {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    @ApiProperty({example: "+84 0971908623"})
    phone: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "random password" })
    password: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "ADMIN" })
    role: string
}