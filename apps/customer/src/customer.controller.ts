import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { JwtAuthGuard } from '@app/common';
@Controller()
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('sendBookingRequest')
  async sendBookingRequest(@Body() dto: CreateBookingRequest) {
    return await this.customerService.createBookingRequest(dto);
  }
}
