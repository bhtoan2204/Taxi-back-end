import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackerDTO {
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
}