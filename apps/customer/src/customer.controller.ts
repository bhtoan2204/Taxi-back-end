import { Controller, Get, Post, Body, UseGuards, Req, Patch, Headers } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { JwtAuthGuard } from '@app/common';
import { CustomerGuard } from '@app/common/auth/customer.guard';
import { LatLongDTO } from './dto/latlong.request';
import { UserInforPayload } from './interface/userInfor.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@UseGuards(JwtAuthGuard)
@Controller()
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) { }

  @Post('sendBookingRequest')
  @UseGuards(CustomerGuard)
  async sendBookingRequest(@Body() dto: CreateBookingRequest, @Headers('authentication') authentication: string) {
    return await this.customerService.createBookingRequest(dto);
  }

  @Get('userInfor')
  @UseGuards(CustomerGuard)
  async getUserInfor(@Req() request, @Headers('authentication') authentication: string) {
    const { _id, phone, role, latitude, longitude, full_name } = request.user as UserInforPayload;
    return { _id, phone, role, latitude, longitude, full_name };
  }

  @Patch('setLatLong')
  @UseGuards(CustomerGuard)
  async setLatLong(@Body() dto: LatLongDTO, @Req() request, @Headers('authentication') authentication: string) {
    const { _id } = request.user as UserInforPayload;
    return this.customerService.setLatLong(_id, dto);
  }

  @Get('getHistory')
  @UseGuards(CustomerGuard)
  async getHistory(@Req() request, @Headers('authentication') authentication: string){
    const { _id } = request.user as UserInforPayload;
    return this.customerService.getHistory(_id);
  }
}