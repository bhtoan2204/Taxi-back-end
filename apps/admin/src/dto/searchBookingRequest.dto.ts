import { CarType } from '@app/common';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class SearchBookingRequest {
    phone: string;

    pickup_address: string;

    car_type: number
}