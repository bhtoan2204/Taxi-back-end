import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTracker {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customer_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driver_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pickup_location: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destination_location: string;

    @ApiProperty()
    @IsNotEmpty()    
    @IsString()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    start_date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    end_date: Date;
}