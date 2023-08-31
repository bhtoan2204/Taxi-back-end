import { Controller, Get, UseGuards } from '@nestjs/common';
import { DriverStatusTrackerService } from './driver-status-tracker.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class DriverStatusTrackerController {
  constructor(
    private readonly driverStatusTrackerService: DriverStatusTrackerService,
    private readonly rmqService: RmqService) { }

  @Get()
  getHello(): string {
    return this.driverStatusTrackerService.getHello();
  }

  @EventPattern('call_tracker')
  //@UseGuards(JwtAuthGuard)
  async testConnect(@Payload() data: any, @Ctx() context: RmqContext) {
    this.driverStatusTrackerService.getMessage(data);
    this.rmqService.ack(context);
  }

  @EventPattern('create_tracker')
  async handleCreateTrackerEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const tracker = await this.driverStatusTrackerService.createTrackerInRepository(data.dto);
    console.log(tracker);
    this.rmqService.ack(context);
    return tracker;
  }

  @EventPattern('get_all_tracker')
  async getAllTracker(@Payload() data: any, @Ctx() context: RmqContext) {
    const result = this.driverStatusTrackerService.getAllTrackers();
    this.rmqService.ack(context);
    return result;
  }
}