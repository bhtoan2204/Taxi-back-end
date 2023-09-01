import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackerDTO {
    @IsNotEmpty()
    @IsString()
    customer_id: string;

    @IsNotEmpty()
    @IsString()
    driver_id: string;

    @IsNotEmpty()
    @IsString()
    pickup_location: string;

    @IsNotEmpty()
    @IsString()
    destination_location: string;

    @IsNotEmpty()    
    @IsString()
    status: string;
}