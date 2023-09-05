import { CarType } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerReceiver {
  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  longtitude: string;

  @ApiProperty()
  @IsString()
  car_type: CarType
}