import { Body, Controller, Get, Post, Req, Res, UseGuards, Query, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@app/common';
import { Request } from 'express';
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
  @Get('getAllBookingRequest')
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

  @UseGuards(AdminGuard)
  @Get('geoCoding')
  async getGeoCoding(@Query() address: string, @Headers('authentication') authentication: string){
    return this.adminService.getGeoCoding(address);
  }

  @UseGuards(AdminGuard)
  @Get('getStatitics')
  async getStatitics(@Headers('authentication') authentication: string){
    return this.adminService.getStatitics();
  } 
}
