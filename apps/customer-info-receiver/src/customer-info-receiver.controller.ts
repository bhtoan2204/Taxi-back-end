import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class CustomerInfoReceiverController {
  constructor(
    private readonly customerInfoReceiverService: CustomerInfoReceiverService,
    private readonly rmqService: RmqService) {}

  @EventPattern('get_booking_request')
  async getAllBookingRequests(@Ctx() context: RmqContext) {
    const result = await this.customerInfoReceiverService.getAllBookingRequest();
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('search_booking_request')
  async elasticSearchBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.searchBookingRequest(data.text, data.offset, data.limit, data.startId);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('create_booking_request')
  async createBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.createBookingRequest(data.dto);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_history')
  async getHistory(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.getHistory(data._id);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('create_booking_customer')
  async createBookingRequestByCustomer(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.createBookingRequestByCustomer(data.data, data._id);
    this.rmqService.ack(context);
    return result;
  }
  
}
