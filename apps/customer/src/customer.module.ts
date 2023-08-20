import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose';
import { BOOKING_SERVICE } from '../constants/services';

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
    MongooseModule,
    DatabaseModule,
    RmqModule.register({
      name: BOOKING_SERVICE
    }),
    AuthModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
