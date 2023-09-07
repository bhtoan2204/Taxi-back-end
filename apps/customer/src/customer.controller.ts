import { Controller, Get, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { JwtAuthGuard } from '@app/common';
import { CustomerGuard } from '@app/common/auth/customer.guard';
import { LatLongDTO } from './dto/latlong.request';

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

  @Get('userInfor')
  @UseGuards(CustomerGuard)
  async getUserInfor(@Req() request) {
    const { _id, phone, role, latitude, longitude } = request.user as UserInforPayload;
    return { _id, phone, role, latitude, longitude };
  }

  @Patch('setLatLong')
  @UseGuards(CustomerGuard)
  async setLatLong(@Body() dto: LatLongDTO, @Req() request) {
    const { _id } = request.user as UserInforPayload;
    return this.customerService.setLatLong(_id, dto);
  }
}

interface UserInforPayload {
  _id: string,
  phone: string,
  role: string,
  latitude: string,
  longitude: string
}