import { Controller, Get, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '@app/common';
import { DriverGuard } from '@app/common/auth/driver.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
  @Get()
  @UseGuards(DriverGuard)
  getHello(): string {
    return this.driverService.getHello();
  }

  
}