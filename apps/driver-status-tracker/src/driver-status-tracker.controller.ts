import { Controller, Get } from '@nestjs/common';
import { DriverStatusTrackerService } from './driver-status-tracker.service';

@Controller()
export class DriverStatusTrackerController {
  constructor(private readonly driverStatusTrackerService: DriverStatusTrackerService) {}

  @Get()
  getHello(): string {
    return this.driverStatusTrackerService.getHello();
  }
}
