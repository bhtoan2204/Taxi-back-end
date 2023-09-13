import { Controller, Get } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class RevenueController {
  constructor(
    private readonly revenueService: RevenueService,
    private readonly rmqService: RmqService) {}

  @EventPattern('get_revenue')
  async revenue_of_week(@Ctx() context: RmqContext) {
    const result = this.revenueService.getRevenue()
    this.rmqService.ack(context);
    return result;
  }

  @EventPattern('get_statistics')
  async getStatistics(@Ctx() context: RmqContext){
    const result = this.revenueService.getStatistics();
    this.rmqService.ack(context);
    return result;
  }
}
