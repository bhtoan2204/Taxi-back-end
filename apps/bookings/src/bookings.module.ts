import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { BookingRepository } from './booking.repository';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          RABBIT_MQ_URI: Joi.string().required(),
          RABBIT_MQ_CUSTOMER_QUEUE: Joi.number().required(),
        }),
        envFilePath: './apps/bookings/.env'
      }),
    DatabaseModule,
    MongooseModule,
    RmqModule,
    AuthModule
  ],

  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
})
export class BookingsModule { }

