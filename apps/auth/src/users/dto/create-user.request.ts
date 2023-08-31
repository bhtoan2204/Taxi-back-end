import { Role } from '@app/common';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;
  
  @IsNotEmpty()
  role: string

}