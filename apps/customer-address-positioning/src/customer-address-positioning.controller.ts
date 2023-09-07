import { Controller, Get } from '@nestjs/common';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class CustomerAddressPositioningController {
  constructor(
    private readonly customerAddressPositioningService: CustomerAddressPositioningService,
    private readonly rmqService: RmqService) {}

    @EventPattern('set_LatLong')
    async locateUser(@Payload() data: any, @Ctx() context: RmqContext){
      const result = this.customerAddressPositioningService.setLatLong(data._id, data.dto);
      this.rmqService.ack(context);
      return result;
    }

    @EventPattern('get_geo_coding')
    async getGeoCoding(@Payload() data: any, @Ctx() context: RmqContext){
      const result = this.customerAddressPositioningService.getGeoCoding(data.address);
      this.rmqService.ack(context);
      return result
    }
}
