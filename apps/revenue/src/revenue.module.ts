import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { ConfigModule } from '@nestjs/config';


import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequest, BookingRequestSchema } from './schema/bookingRequest.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_REVENUE_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required()
      }),
      envFilePath: './apps/revenue/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
    RmqModule,
    AuthModule,
  ],
  controllers: [RevenueController],
  providers: [RevenueService, BookingRequestRepository],
})
export class RevenueModule {}
