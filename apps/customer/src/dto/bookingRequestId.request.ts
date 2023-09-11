import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookingRequestId {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    booking_id: string;
}
