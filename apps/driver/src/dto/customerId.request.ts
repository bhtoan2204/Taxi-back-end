import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CustomerIdDTO {
    @ApiProperty()
    @IsNotEmpty()
    customer_id: string;
}