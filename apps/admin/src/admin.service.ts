import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LOCATE_SERVICE, RECEIVER_SERVICE, REVENUE_SERVICE, TRACKER_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateBookingRequest } from './dto/createBookingRequest.request';

@Injectable()
export class AdminService {
  constructor(
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(TRACKER_SERVICE) private trackerClient: ClientProxy,
    @Inject(REVENUE_SERVICE) private revenueClient: ClientProxy,
  ) { }

  async getAllBookingRequests() {
    try {
      const check = this.receiverClient.send('get_booking_request', {});
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async searchForBookingRequest(text: string, offset?: number, limit?: number, startId?: number,) {
    try {
      const check = this.receiverClient.send('search_booking_request', { text, offset, limit, startId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async getBookingRequest(offset?: number, limit?: number, startId?: number) {
    try {
      const check = this.receiverClient.send('get_booking_request_paginate', { offset, limit, startId });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async createBookingRequest(dto: CreateBookingRequest) {
    try {
      const check = this.receiverClient.send('create_booking_request', { dto });
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async getGeoCoding(address: string){
    try {
      const check = this.locateClient.send('get_geo_coding', { address });
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }
  
  async getStatitics(){
    try {
      const check = this.revenueClient.send('get_statistics', {});
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async getRevenue(){
    try {
      const check = this.revenueClient.send('get_revenue', {});
      const request = await lastValueFrom(check);
      return request;
    }
    catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
