import { IsString, IsNumber, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingRequest {
    @IsString()
    customer_id: string;

    @IsDate()
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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Array)
    s2e_coords: [number, number][];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Array)
    d2s_coords: [number, number][];
}
