import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@app/common';
import { CustomerReceiver } from '../dto/getLocation.request';
import { Request } from 'express';
import { CreateTracker } from '../dto/createTracker.request';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
  async testConnect1(){
    return await this.adminService.callReceiver();
  }

  @Get('call_locate')
  async testConnect2(){
    return await this.adminService.callLocate();
  }

  @Get('call_tracker')
  async testConnect3(){
    return await this.adminService.callTracker();
  }

  @Post('createTracker')
  @UseGuards(JwtAuthGuard)
  async createTracker(@Body() dto: CreateTracker, @Req() request: Request){
    return await this.adminService.createTracker(dto);
  }

}
