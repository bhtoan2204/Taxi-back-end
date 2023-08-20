import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { BOOKING_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices'
import { CreateBookingRequest } from './dto/create_bookings.request';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingRepository,
    @Inject(BOOKING_SERVICE) private bookingClient: ClientProxy) { }

  async getBookings() {
    return await this.bookingsRepository.find({});
  }
  async createBooking(request: CreateBookingRequest) {
    const session = await this.bookingsRepository.startTransaction();
    try {
      const order = await this.bookingsRepository.create(request, { session });
      return order;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
}
