import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { LOCATE_SERVICE, RECEIVER_SERVICE, TRACKER_SERVICE } from './constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RatingDTO } from './dto/rateDriver.request';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(TRACKER_SERVICE) private trackerClient: ClientProxy,
  ) { }

  async createBookingRequestByCustomer(data: CreateBookingRequest, _id: string) {
    try {
      const check = this.receiverClient.send('create_booking_customer', { data, _id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async setLatLong(_id: string, dto: any) {
    try {
      const check = this.locateClient.send('set_LatLong', { _id, dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getHistory(_id: string) {
    try {
      const check = this.receiverClient.send('get_history_customer', { _id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getDriverLocation(bookingId: string) {
    try {
      const check = this.locateClient.send('get_driver_location', { bookingId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e
    }
  }

  async rateDriver(dto: RatingDTO) {
    try {
      const check = this.trackerClient.send('rate_driver', { dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e
    }
  }

  async getDriverRate(driver_id: string) {
    try {
      const check = this.trackerClient.send('get_rate_driver', { driver_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e
    }
  }

  async cancelRequest(customer_id: string, booking_id: string) {
    try {
      const check = this.receiverClient.send('cancel_booking_request', { customer_id, booking_id });
      const requests = await lastValueFrom(check);
      return {requests, isSuccessful: true};
    }
    catch (e) {
      throw e;
    }
  }
}
