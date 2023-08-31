import { Module } from '@nestjs/common';
import { CustomerInfoReceiverController } from './customer-info-receiver.controller';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { BookingRequest, BookingRequestSchema } from 'apps/customer-info-receiver/src/schema/bookingRequest.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequestRepository } from '../src/repositories/bookingRequest.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RECEIVER_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required()
      }),
      envFilePath: './apps/customer-info-receiver/.env',
    }),
    RmqModule,
    AuthModule,
    DatabaseModule,
    MongooseModule.forFeature([{name: BookingRequest.name, schema: BookingRequestSchema}])
  ],
  controllers: [CustomerInfoReceiverController],
  providers: [
    CustomerInfoReceiverService,
    BookingRequestRepository
  ],
})
export class CustomerInfoReceiverModule { }
