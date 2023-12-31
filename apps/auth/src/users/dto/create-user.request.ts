import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  @ApiProperty({ example: "" })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Nguyen Van A" })
  full_name: string;
  
  @IsString()
  @IsEnum(Role, {each: true})
  @IsNotEmpty()
  @ApiProperty({ example: "CUSTOMER"})
  role: Role
}