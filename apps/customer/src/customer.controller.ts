import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rmqService: RmqService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @EventPattern('booking_created')
  @UseGuards(JwtAuthGuard)
  async handleBookingCreated(@Payload() data: any, @Ctx() context: RmqContext){
    this.customerService.createCustomer(data);
    this.rmqService.ack(context)
  }
}
