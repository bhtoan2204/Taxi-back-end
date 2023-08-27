import { Module } from '@nestjs/common';
import { DriverStatusTrackerController } from './driver-status-tracker.controller';
import { DriverStatusTrackerService } from './driver-status-tracker.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { StatusTrackerRepository } from './repositories/statusTracker.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusTracker, StatusTrackerSchema } from './schemas/statusTracker.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TRACKER_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/driver-status-tracker/.env',
    }),
    RmqModule,
    AuthModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: StatusTracker.name, schema: StatusTrackerSchema }]),
  ],
  controllers: [DriverStatusTrackerController],
  providers: [
    DriverStatusTrackerService,
    StatusTrackerRepository,
  ],
})
export class DriverStatusTrackerModule { }
