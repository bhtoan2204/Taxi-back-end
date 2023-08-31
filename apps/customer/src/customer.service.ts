import { Injectable } from '@nestjs/common';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { CreateBookingRequest } from './dto/createBookingRequest.request';

@Injectable()
export class CustomerService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
  ) { }
  getHello(): string {
    return 'Hello World! From Customer';
  }

  async createBookingRequest(data: CreateBookingRequest) {
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.create(data, { session });
      await session.commitTransaction();
      return bookingRequest;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
}
