import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class CustomerInfoReceiverController {
  constructor(
    private readonly customerInfoReceiverService: CustomerInfoReceiverService,
    private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.customerInfoReceiverService.getHello();
  }

  @EventPattern('call_receiver')
  //@UseGuards(JwtAuthGuard)
  async testConnect(@Payload() data: any, @Ctx() context: RmqContext){
    this.customerInfoReceiverService.getMessage(data);
    this.rmqService.ack(context);
  }

  @EventPattern('get_booking_request')
  async getAllBookingRequest(@Ctx() context: RmqContext) {
    const result = this.customerInfoReceiverService.getAllBookingRequest();
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('search_booking_request')
  async elasticSearchBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.searchBookingRequest(data.text, data.offset, data.limit, data.startId);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_booking_request_paginate')
  async getBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.getBookingRequest(data.offset, data.limit, data.startId);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('create_booking_request')
  async createBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.createBookingRequest(data.dto);
    this.rmqService.ack(context);
    return result;
  }
}
