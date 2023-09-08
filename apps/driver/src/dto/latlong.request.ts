import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class LatLongDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}