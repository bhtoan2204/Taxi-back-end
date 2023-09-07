import { IsNotEmpty, IsNumber } from "class-validator";

export class LatLongDTO {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}