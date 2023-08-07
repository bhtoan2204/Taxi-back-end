import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CUSTOMER_QUEUE: Joi.string().required()
      }),
    }),
    RmqModule,
    AuthModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
