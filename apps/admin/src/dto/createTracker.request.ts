import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTracker {
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

    @IsNotEmpty()
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @IsDate()
    end_date: Date;
}