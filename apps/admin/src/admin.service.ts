import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LOCATE_SERVICE, RECEIVER_SERVICE, TRACKER_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTracker } from './dto/createTracker.request';
import { CreateBookingRequest } from './dto/createBookingRequest.request';

@Injectable()
export class AdminService {
  constructor(
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(TRACKER_SERVICE) private trackerClient: ClientProxy,
  ) { }

  async createTracker(dto: CreateTracker) {
    try {
      const check = this.trackerClient.send('create_tracker', { dto });
      const tracker = await lastValueFrom(check);
      return tracker;
    } catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }

  async getAllBookingRequests() {
    try {
      const check = this.receiverClient.send('get_booking_request', {});
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }

  async searchForBookingRequest(text: string, offset?: number, limit?: number, startId?: number,) {
    try {
      const check = this.receiverClient.send('search_booking_request', { text, offset, limit, startId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }

  async getBookingRequest(offset?: number, limit?: number, startId?: number) {
    try {
      const check = this.receiverClient.send('get_booking_request_paginate', { offset, limit, startId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }

  async createBookingRequest(dto: CreateBookingRequest) {
    try {
      const check = this.receiverClient.send('create_booking_request', { dto });
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }

  async getGeoCoding(address: string){
    try {
      const check = this.locateClient.send('get_geo_coding', { address });
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }
}
