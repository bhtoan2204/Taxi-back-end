import { Module } from '@nestjs/common';
import { CustomerInfoReceiverController } from './customer-info-receiver.controller';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RECEIVER_QUEUE: Joi.string().required()
      })
    }),
    RmqModule,
    AuthModule
  ],
  controllers: [CustomerInfoReceiverController],
  providers: [CustomerInfoReceiverService],
})
export class CustomerInfoReceiverModule { }
