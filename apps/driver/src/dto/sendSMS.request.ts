import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneDTO {
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;
}