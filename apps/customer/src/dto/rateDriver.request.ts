import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RatingDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    driver_id: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}