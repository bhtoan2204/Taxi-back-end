import { Body, Controller, Get, Post, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@app/common';
import { Request } from 'express';
import { CustomerReceiver } from './dto/getLocation.request';
import { CreateTrackerDTO } from './dto/createTracker.dto';
import { CreateTracker } from './dto/createTracker.request';
import PaginationParamsDto from './dto/paginationParams.dto';

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,

    ) { }

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @Post('getReceiver')
  @UseGuards(JwtAuthGuard)
  async callReceiver(@Body() dto: CustomerReceiver, @Req() request: Request) {
    return await this.adminService.callReceiver();
  }

  @Get('call_receiver')
  async testConnect1() {
    return await this.adminService.callReceiver();
  }

  @Get('call_locate')
  async testConnect2() {
    return await this.adminService.callLocate();
  }

  @Get('call_tracker')
  async testConnect3() {
    return await this.adminService.callTracker();
  }

  @Post('createTracker')
  @UseGuards(JwtAuthGuard)
  async createTracker(@Body() dto: CreateTrackerDTO, @Req() request: Request) {
    const newTracker = new CreateTracker();
    newTracker.customer_id = dto.customer_id;
    newTracker.driver_id = dto.driver_id;
    newTracker.pickup_location = dto.pickup_location;
    newTracker.destination_location = dto.destination_location;
    newTracker.status = dto.status;
    newTracker.start_date = new Date();
    newTracker.end_date = new Date();
    const tracker = await this.adminService.createTracker(newTracker);
    return tracker;
  }

  @Get('getBookingRequest')
  @UseGuards(JwtAuthGuard)
  async getBookingRequest() {
    const bookingRequests = await this.adminService.getAllBookingRequests();
    return bookingRequests;
  }

  @Get('search-booking-request')
  @UseGuards(JwtAuthGuard)
  async searchBookingRequest(
    @Query('search') search: string,
    @Query() query: PaginationParamsDto,
  ) {
    const { limit, offset, startId } = query;

    if (search) {
      return this.adminService.searchForBookingRequest(search, offset, limit, startId);
    }

    return this.adminService.getBookingRequest(offset, limit, startId);
  }
}
