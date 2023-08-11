import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../enums/role.enums';

export class CreateUserRequest {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role
}