import { IsString, IsNumber, IsDate, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateBookingRequest {
    @IsString()
    customer_id: string;

    @IsPhoneNumber()
    phone: string

    @IsDateString()
    booking_time: Date;

    @IsNumber()
    car_type: number;

    @IsString()
    pickup_address: string;

    @IsString()
    dropoff_address: string;

    @IsNumber()
    pickup_latitude: number;

    @IsNumber()
    pickup_longitude: number;

    @IsNumber()
    dropoff_latitude: number;

    @IsNumber()
    dropoff_longitude: number;

    @IsNumber()
    price: number;

    @IsNumber()
    distance: number;

    @IsNumber()
    duration: number;
}
