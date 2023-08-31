import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@app/common';
import { CustomerReceiver } from '../dto/getLocation.request';
import { Request, Response } from 'express';
import { CreateTracker } from '../dto/createTracker.request';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

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
  async createTracker(@Body() dto: any, @Req() request: Request) {
    const newTracker = new CreateTracker();
    newTracker.customer_id = dto.customer_id;
    newTracker.driver_id = dto.driver_id;
    newTracker.pickup_location = dto.pickup_location;
    newTracker.destination_location = dto.destination_location;
    newTracker.status = dto.status;
    newTracker.start_date = new Date(dto.start_date);
    newTracker.end_date = new Date(dto.end_date);
    const tracker = await this.adminService.createTracker(newTracker);
    console.log(tracker);
    return tracker;
  }

  @Get('getTracker')
  @UseGuards(JwtAuthGuard)
  async getTracker(@Req() request: Request) {
    
  }
}
