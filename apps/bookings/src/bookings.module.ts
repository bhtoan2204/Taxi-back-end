import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { BookingRepository } from './booking.repository';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'
import { Booking, BookingSchema } from './schemas/booking.schema';
import { CUSTOMER_SERVICE } from '../constants/services';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.number().required(),
        }),
        envFilePath: './apps/bookings/.env'
      }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    RmqModule,
    AuthModule
  ],

  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
})
export class BookingsModule { }

