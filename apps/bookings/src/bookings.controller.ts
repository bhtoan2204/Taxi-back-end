import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingRequest } from './dto/create_bookings.request';
import { JwtAuthGuard } from '@app/common';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get() {
    return this.bookingsService.getBookings();
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookings(@Body() request: CreateBookingRequest, @Req() req: any){
    console.log(req.user)
    return this.bookingsService.createBooking(request)
  }
  
}
