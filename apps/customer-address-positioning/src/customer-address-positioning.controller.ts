import { Controller, Get } from '@nestjs/common';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';

@Controller()
export class CustomerAddressPositioningController {
  constructor(private readonly customerAddressPositioningService: CustomerAddressPositioningService) {}

  @Get()
  getHello(): string {
    return this.customerAddressPositioningService.getHello();
  }
}
