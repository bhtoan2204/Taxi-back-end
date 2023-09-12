import { Controller, Get } from '@nestjs/common';
import { RevenueService } from './revenue.service';

@Controller()
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  getHello(): string {
    return this.revenueService.getHello();
  }
}
