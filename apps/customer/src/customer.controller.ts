import { Controller, Get, Post, Body, UseGuards, Req, Patch, Headers, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { JwtAuthGuard } from '@app/common';
import { CustomerGuard } from '@app/common/auth/customer.guard';
import { LatLongDTO } from './dto/latlong.request';
import { UserInforPayload } from './interface/userInfor.interface';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RatingDTO } from './dto/rateDriver.request';
import { BookingRequestId } from './dto/bookingRequestId.request';

@ApiTags('Customer')
@UseGuards(JwtAuthGuard)
@Controller()
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) { }

  @Post('sendBookingRequest')
  @UseGuards(CustomerGuard)
  async sendBookingRequest(@Body() dto: CreateBookingRequest, @Headers('authentication') authentication: string, @Req() request) {
    const { _id } = request.user as UserInforPayload;
    return await this.customerService.createBookingRequestByCustomer(dto, _id);
  }

  @Get('userInfor')
  @UseGuards(CustomerGuard)
  async getUserInfor(@Req() request, @Headers('authentication') authentication: string) {
    const { _id, phone, role, latitude, longitude, full_name, is_Vip } = request.user as UserInforPayload;
    return { _id, phone, role, latitude, longitude, full_name, is_Vip };
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

  @Post('getDriverLocationByBR')
  @UseGuards(CustomerGuard)
  async getDriverLocation(@Body() dto: BookingRequestId, @Headers('authentication') authentication: string){
    return this.customerService.getDriverLocation(dto.booking_id);
  }

  @Post('rateDriver')
  @UseGuards(CustomerGuard)
  async rateDriver(@Body() dto: RatingDTO, @Headers('authentication') authentication: string){
    return this.customerService.rateDriver(dto);
  }

  @ApiQuery({ name: 'driver_id', description: 'Driver ID' })
  @Get('driverRate')
  @UseGuards(CustomerGuard)
  async getDriverRate(@Query('driver_id') driver_id: string, @Headers('authentication') authentication: string){
    return this.customerService.getDriverRate(driver_id);
  }
}