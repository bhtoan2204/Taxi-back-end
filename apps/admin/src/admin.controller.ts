import { Body, Controller, Get, Post, Req, Res, UseGuards, Query, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@app/common';
import { Request } from 'express';
import { CreateTrackerDTO } from './dto/createTracker.dto';
import { CreateTracker } from './dto/createTracker.request';
import PaginationParamsDto from './dto/paginationParams.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import { AdminGuard } from '@app/common/auth/admin.guard';

@ApiTags('Admin')
@UseGuards(JwtAuthGuard)
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService) { }

  @UseGuards(AdminGuard)
  @Post('createTracker')
  async createTracker(@Body() dto: CreateTrackerDTO, @Req() request: Request, @Headers('authentication') authentication: string) {
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

  @UseGuards(AdminGuard)
  @Get('getBookingRequest')
  async getBookingRequest(@Headers('authentication') authentication: string) {
    const bookingRequests = await this.adminService.getAllBookingRequests();
    return bookingRequests;
  }

  @UseGuards(AdminGuard)
  @Post('createBookingRequest')
  async createBookingRequest(@Body() dto: CreateBookingRequest, @Headers('authentication') authentication: string){
    const bookingRequest = await this.adminService.createBookingRequest(dto);
    return bookingRequest;
  }

  @UseGuards(AdminGuard)
  @Get('searchBookingRequest')
  async searchBookingRequest(
    @Query('search') search: string,
    @Query() query: PaginationParamsDto,
    @Headers('authentication') authentication: string
  ) {
    const { limit, offset, startId } = query;

    if (search) {
      return this.adminService.searchForBookingRequest(search, offset, limit, startId);
    }

    return this.adminService.getBookingRequest(offset, limit, startId);
  }
}
