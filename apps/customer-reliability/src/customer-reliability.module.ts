import { Module } from '@nestjs/common';
import { CustomerReliabilityController } from './customer-reliability.controller';
import { CustomerReliabilityService } from './customer-reliability.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reliability, ReliabilitySchema } from './schema/reliability.schema';
import { ReliabilityRepository } from './repositories/reliability.repositories';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RELIABILITY_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/customer-info-receiver/.env',
    }),
    RmqModule,
    AuthModule,
    DatabaseModule,
    MongooseModule.forFeature([{name: Reliability.name, schema: ReliabilitySchema}]),
  ],
  controllers: [CustomerReliabilityController],
  providers: [
    CustomerReliabilityService,
    ReliabilityRepository
  ],
})
export class CustomerReliabilityModule {}
