import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTracker {
    @IsString()
    customer_id: string;

    @IsString()
    driver_id: string;

    @IsString()
    pickup_location: string;

    @IsString()
    destination_location: string;

    @IsString()
    status: string;
}