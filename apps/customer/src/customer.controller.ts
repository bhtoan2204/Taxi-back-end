import { Controller, Get, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
@Controller()
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Post('sendBookingRequest')
  async sendBookingRequest(@Body() dto: CreateBookingRequest) {
    return await this.customerService.createBookingRequest(dto);
  }
}
