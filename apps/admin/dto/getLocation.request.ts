import { CarType } from '@app/common';
import {IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerReceiver {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  latitude: string;

  @IsString()
  longtitude: string;

  @IsString()
  car_type: CarType
}