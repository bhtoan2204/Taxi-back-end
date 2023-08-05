import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() data: any, @Ctx() context: RmqContext){
    this.customerService.createCustomer(data);
  }
}
