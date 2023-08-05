import { IsString, IsNotEmpty, IsPositive } from "class-validator";

export class CreateBookingRequest{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    booking_id: number

    @IsPositive()
    customer_id: number

    @IsPositive()
    driver_id: number
}