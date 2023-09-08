import { Controller, Get, Patch, UseGuards, Req, Headers, Body } from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '@app/common';
import { DriverGuard } from '@app/common/auth/driver.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserInforPayload } from './constants/services';
import { LatLongDTO } from './dto/latlong.request';

@ApiTags('Driver')
@Controller()
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Patch('setOnline')
  @UseGuards(DriverGuard)
  async setOnline(@Req() request, @Headers('authentication') authentication: string) {
    const userId = request.user._id;
    return this.driverService.setOnline(userId);
  }

  @Patch('setOffline')
  @UseGuards(DriverGuard)
  async setOffline(@Req() request, @Headers('authentication') authentication: string) {
    const userId = request.user._id;
    return this.driverService.setOffline(userId);
  }

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
}