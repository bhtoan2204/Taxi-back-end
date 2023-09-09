import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { LOCATE_SERVICE, RECEIVER_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DriverService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    ) { }

  async setLatLong(_id: string, dto: any){
    try {
      const check = this.locateClient.send('set_LatLong', { _id, dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getNearBookingRequest(dto: any){
    try {
      const check = this.receiverClient.send('get_nearby_booking_requests', { dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async acceptBookingRequest(driver_id: string, booking_id: string){
    try{
      const check = this.receiverClient.send('accept_booking_request', { driver_id, booking_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e;
    }
  }

  async getHistory(driver_id: string){
    try{
      const check = this.receiverClient.send('get_history_driver', { driver_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e;
    }
  }

  async setCompleted(driver_id: string, booking_id: string){
    try{
      const check = this.receiverClient.send('set_completed', { driver_id, booking_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch(e){
      throw e;
    }
  }
}
