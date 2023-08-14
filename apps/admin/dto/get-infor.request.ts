import { IsPhoneNumber, IsString } from "class-validator";

export class GetInformation{
    @IsPhoneNumber()
    phone: string

    @IsString()
    longtitude: string

    @IsString()
    latitude: string

    @IsString()
    car_type: string
}