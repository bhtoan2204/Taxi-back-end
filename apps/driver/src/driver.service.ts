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

}
