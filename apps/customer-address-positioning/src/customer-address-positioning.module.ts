import { Module } from '@nestjs/common';
import { CustomerAddressPositioningController } from './customer-address-positioning.controller';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, RmqModule } from '@app/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_LOCATE_QUEUE: Joi.string().required()
      })
    }),
    RmqModule,
    AuthModule
  ],
  controllers: [CustomerAddressPositioningController],
  providers: [CustomerAddressPositioningService],
})
export class CustomerAddressPositioningModule {}
