import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './schemas/booking.schema';
import { CreateBookingRequest } from './dto/create_bookings.request';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async get() {
    return this.bookingsService.getBookings();
  }
  @Post()
  async createBookings(@Body() request: CreateBookingRequest, @Req() req: any){
    return this.bookingsService.createBooking(request)
  }
}
