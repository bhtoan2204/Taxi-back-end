import { CarType, Status } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPhoneNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateBookingRequest {
    @ApiProperty()
    @IsEnum(Status) 
    status: Status;

    @ApiProperty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    @IsDateString()
    booking_time: any = new Date().toISOString();

    @ApiProperty()
    @IsEnum(CarType)
    car_type: CarType;

    @ApiProperty()
    @IsString()
    pickup_address: string;

    @ApiProperty()
    @IsString()
    dropoff_address: string;

    @ApiProperty()
    @IsNumber()
    pickup_latitude: number;

    @ApiProperty()
    @IsNumber()
    pickup_longitude: number;

    @ApiProperty()
    @IsNumber()
    dropoff_latitude: number;

    @ApiProperty()
    @IsNumber()
    dropoff_longitude: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    distance: number;

    @ApiProperty()
    @IsNumber()
    duration: number;
}
