import { Controller, Get } from '@nestjs/common';
import { DriverStatusTrackerService } from './driver-status-tracker.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class DriverStatusTrackerController {
  constructor(
    private readonly driverStatusTrackerService: DriverStatusTrackerService,
    private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.driverStatusTrackerService.getHello();
  }

  @EventPattern('call_tracker')
  //@UseGuards(JwtAuthGuard)
  async testConnect(@Payload() data: any, @Ctx() context: RmqContext){
    this.driverStatusTrackerService.getMessage(data);
    this.rmqService.ack(context);
  }
}
