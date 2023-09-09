import { Controller, Get, UseGuards } from '@nestjs/common';
import { DriverStatusTrackerService } from './driver-status-tracker.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class DriverStatusTrackerController {
  constructor(
    private readonly driverStatusTrackerService: DriverStatusTrackerService,
    private readonly rmqService: RmqService) { }

  
  @EventPattern('rate_driver')
  async addRating(@Payload() data: any, @Ctx() context: RmqContext){
    const result = this.driverStatusTrackerService.addRating(data.dto);
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_all_tracker')
  async getAllTracker(@Payload() data: any, @Ctx() context: RmqContext) {
    const result = this.driverStatusTrackerService.getAllTrackers();
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_rate_driver')
  async getDriverRate(@Payload() data: any, @Ctx() context: RmqContext) {
    const result = this.driverStatusTrackerService.getDriverRate(data);
    this.rmqService.ack(context);
    return result;
  }
}
