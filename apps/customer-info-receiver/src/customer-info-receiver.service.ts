import { Injectable } from '@nestjs/common';
import { BookingRequestRepository } from 'apps/customer-info-receiver/src/repositories/bookingRequest.repository';

@Injectable()
export class CustomerInfoReceiverService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getMessage(data: any){
    console.log('goes here')
    console.log(data);
  }

  async getAllBookingRequest() {
    return await this.bookingRequestRepository.find({});
  }
}
