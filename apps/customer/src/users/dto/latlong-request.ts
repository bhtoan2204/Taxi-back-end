import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LatLongRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    longitude: number
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    latitude: number
}