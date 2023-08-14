import { Body, Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { GetInformation } from '../dto/get-infor.request';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @Get('getInformation')
  async getInformation(@Body() request: GetInformation): Promise<any> {
    return this.adminService.getInformation(request)
  }
}
