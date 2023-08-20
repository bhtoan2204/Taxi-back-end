import { Controller, Get } from '@nestjs/common';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';

@Controller()
export class CustomerInfoReceiverController {
  constructor(private readonly customerInfoReceiverService: CustomerInfoReceiverService) {}

  @Get()
  getHello(): string {
    return this.customerInfoReceiverService.getHello();
  }
}
