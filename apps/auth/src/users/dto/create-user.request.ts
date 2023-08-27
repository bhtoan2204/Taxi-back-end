import { Role } from '@app/common';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role
}