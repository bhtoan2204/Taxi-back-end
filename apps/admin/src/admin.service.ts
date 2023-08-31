import { Inject, Injectable } from '@nestjs/common';
import { LOCATE_SERVICE, RECEIVER_SERVICE, TRACKER_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTracker } from '../dto/createTracker.request';

@Injectable()
export class AdminService {
  constructor(
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(TRACKER_SERVICE) private trackerClient: ClientProxy,
  ) { }

  getHello(): string {
    return 'Hello World! From Admin';
  }
  async callReceiver() {
    try {
      const message = "adu";
      await lastValueFrom(this.receiverClient.emit('call_receiver', { message }));
    }
    catch (e) {
      throw e;
    }
  }

  async callLocate() {
    try {
      const message = "adu";
      await lastValueFrom(this.locateClient.emit('call_locate', { message }));
    }
    catch (e) {
      throw e;
    }
  }

  async callTracker() {
    try {
      const message = "adu";
      await lastValueFrom(this.trackerClient.emit('call_tracker', { message }));
    }
    catch (e) {
      throw e;
    }
  }

  async createTracker(dto: CreateTracker) {
    try {
      const checkToken = this.trackerClient.send('create_tracker', {dto});
      const tracker =  await lastValueFrom(checkToken);
      console.log(tracker);
      return tracker;
    } catch (e) {
      throw e;
    }
  }
}
