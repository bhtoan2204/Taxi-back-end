import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

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

  @EventPattern('get_history_customer')
  async getHistoryCustomer(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.getHistoryCustomer(data._id);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_history_driver')
  async getHistoryDriver(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.getHistoryDriver(data.driver_id);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('create_booking_customer')
  async createBookingRequestByCustomer(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.createBookingRequestByCustomer(data.data, data._id);
    this.rmqService.ack(context);
    return result;
  }
  
  @EventPattern('get_nearby_booking_requests')
  async getNearbyBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.getNearbyBookingRequest(data.dto);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('accept_booking_request')
  async acceptBookingRequest(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.acceptBookingRequest(data.driver_id, data.booking_id);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('set_completed')
  async setCompleted(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerInfoReceiverService.setCompleted(data.driver_id, data.booking_id);
    this.rmqService.ack(context);
    return result;
  }
}
