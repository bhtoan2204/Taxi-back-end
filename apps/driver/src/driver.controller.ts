import { Controller, Get, Patch, UseGuards, Req, Headers, Body, Query, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '@app/common';
import { DriverGuard } from '@app/common/auth/driver.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserInforPayload } from './constants/services';
import { LatLongDTO } from './dto/latlong.request';
import { PhoneDTO } from './dto/sendSMS.request';
import { CustomerIdDTO } from './dto/customerId.request';

@ApiTags('Driver')
@Controller()
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('userInfor')
  @UseGuards(DriverGuard)
  async getUserInfor(@Req() request, @Headers('authentication') authentication: string) {
    const { _id, phone, role, latitude, longitude, full_name, is_Vip } = request.user as UserInforPayload;
    return { _id, phone, role, latitude, longitude, full_name, is_Vip };
  }

  @Patch('setLatLong')
  @UseGuards(DriverGuard)
  async setLatLong(@Body() dto: LatLongDTO, @Req() request, @Headers('authentication') authentication: string) {
    const { _id } = request.user as UserInforPayload;
    return this.driverService.setLatLong(_id, dto);
  }

  @Get('getNearbyBookingRequest')
  @UseGuards(DriverGuard)
  async getNearBookingRequest(@Req() request, @Headers('authentication') authentication: string){
    const driver_infor = request.user as UserInforPayload;
    return this.driverService.getNearBookingRequest(driver_infor);
  }
  
  @Patch('acceptBookingRequest')
  @UseGuards(DriverGuard)
  async acceptBookingRequest(@Query('booking_id') booking_id: string, @Req() request, @Headers('authentication') authentication: string){
    const driver_infor = request.user as UserInforPayload;
    return this.driverService.acceptBookingRequest(driver_infor._id, booking_id);
  }

  @Get('getHistory')
  @UseGuards(DriverGuard)
  async getHistory(@Req() request, @Headers('authentication') authentication: string){
    const { _id } = request.user as UserInforPayload;
    return this.driverService.getHistory(_id);
  }

  @Patch('setCompleted')
  @UseGuards(DriverGuard)
  async setComplete(@Query('booking_id') booking_id: string, @Req() request, @Headers('authentication') authentication: string){
    const { _id } = request.user as UserInforPayload;
    return this.driverService.setCompleted(_id, booking_id);
  }

  @Post('sendSMS')
  @UseGuards(DriverGuard)
  async sendSMS(@Body() dto: PhoneDTO, @Req() request, @Headers('authentication') authentication: string){
    const driver = request.user as UserInforPayload;
    return this.driverService.sendSms(dto.phone, driver);
  }

  @Post('sendNotification')
  @UseGuards(DriverGuard)
  async sendNotification(@Body() dto: CustomerIdDTO, @Req() request, @Headers('authentication') authentication: string){
    const driver = request.user as UserInforPayload;
    return this.driverService.sendNotification(dto.customer_id, driver);
  }
}