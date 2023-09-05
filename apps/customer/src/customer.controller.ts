import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { JwtAuthGuard } from '@app/common';
import { CustomerGuard } from '@app/common/auth/customer.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Post('sendBookingRequest')
  @UseGuards(CustomerGuard)
  async sendBookingRequest(@Body() dto: CreateBookingRequest) {
    return await this.customerService.createBookingRequest(dto);
  }
}
