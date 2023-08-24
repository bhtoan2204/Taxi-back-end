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
}
