import { CarType, Status } from '@app/common';
import { IsString, IsNumber, IsPhoneNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateBookingRequest {
    @IsString()
    customer_id: string;

    @IsString()
    driver_id: string;

    @IsEnum(Status) 
    status: Status;

    @IsPhoneNumber()
    phone: string;

    @IsDateString()
    booking_time: any = new Date().toISOString();

    @IsEnum(CarType)
    car_type: CarType;

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
