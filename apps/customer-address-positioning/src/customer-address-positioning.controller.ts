import { Controller, Get } from '@nestjs/common';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class CustomerAddressPositioningController {
  constructor(
    private readonly customerAddressPositioningService: CustomerAddressPositioningService,
    private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.customerAddressPositioningService.getHello();
  }

  @EventPattern('call_locate')
  //@UseGuards(JwtAuthGuard)
  async testConnect(@Payload() data: any, @Ctx() context: RmqContext){
    this.customerAddressPositioningService.getMessage(data);
    this.rmqService.ack(context);
  }
}
