import { Module } from '@nestjs/common';
import { DriverStatusTrackerController } from './driver-status-tracker.controller';
import { DriverStatusTrackerService } from './driver-status-tracker.service';

@Module({
  imports: [],
  controllers: [DriverStatusTrackerController],
  providers: [DriverStatusTrackerService],
})
export class DriverStatusTrackerModule {}
