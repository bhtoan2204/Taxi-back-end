import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { LOCATE_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DriverService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy
    ) { }

  async setOnline(userId: string) {
    try {
      const user = await this.userRepository.findOneAndUpdate({ _id: userId }, { status: "online" })
      return user;
    }
    catch (e) {
      throw e
    }
  }

  async setOffline(userId: string) {
    try {
      const user = await this.userRepository.findOneAndUpdate({ _id: userId }, { status: "offline" })
      return user;
    }
    catch (e) {
      throw e
    }
  }

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
}
