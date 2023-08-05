import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserRequest {
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}