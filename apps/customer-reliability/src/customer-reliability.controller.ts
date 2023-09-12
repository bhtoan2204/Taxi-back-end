import { Controller, Get } from '@nestjs/common';
import { CustomerReliabilityService } from './customer-reliability.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class CustomerReliabilityController {
  constructor(
    private readonly customerReliabilityService: CustomerReliabilityService,
    private readonly rmqService: RmqService) {}

  @EventPattern('customer_reliability')
  async getCustomberReliability(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.customerReliabilityService.customerReliability(data.customer_id);
    this.rmqService.ack(context);
    return result;
  }
}
