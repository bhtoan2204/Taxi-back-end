import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

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
  @ApiProperty({ example: "" })
  full_name: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "" , description: "only takes these arguments: ADMIN, CUSTOMER, DRIVER"})
  role: string

}