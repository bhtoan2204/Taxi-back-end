import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { BookingRequest, BookingRequestSchema } from './schema/bookingRequest.schema';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.string().required()
        }),
        envFilePath: './apps/customer/.env'
      }
    ),
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
    DatabaseModule,
    RmqModule,
    AuthModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    BookingRequestRepository],
})
export class CustomerModule { }
