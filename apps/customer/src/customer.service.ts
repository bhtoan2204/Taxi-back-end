import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { SearchService } from '@app/common/elasticsearch/search.service';
import { UsersRepository } from './repositories/users.repository';
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
  getHello(): string {
    return 'Hello World! From Customer';
  }

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
      const check = this.receiverClient.send('get_history', { _id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getDriverLocation(bookingId: string){
    try{
      const check = this.locateClient.send('get_driver_location', { bookingId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e
    }
  }

  async rateDriver(dto: RatingDTO){
    try{
      const check = this.trackerClient.send('rate_driver', { dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e
    }
  }

  async getDriverRate(driver_id: string){
    try{
      const check = this.trackerClient.send('get_rate_driver', {driver_id});
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e
    }
  }
}
