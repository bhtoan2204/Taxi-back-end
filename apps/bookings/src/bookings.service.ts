import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CUSTOMER_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices'
import { CreateBookingRequest } from './dto/create_bookings.request';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingRepository,
    @Inject(CUSTOMER_SERVICE) private customerClient: ClientProxy) { }

  async getBookings() {
    return await this.bookingsRepository.find({});
  }
  async createBooking(request: CreateBookingRequest, authentication: string) {
    const session = await this.bookingsRepository.startTransaction();
    try {
      const order = await this.bookingsRepository.create(request, { session });
      await lastValueFrom(
        this.customerClient.emit('booking_created', {
          request,
          Authentication: authentication
        }),
      );
      await session.commitTransaction();
      return order;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
}
