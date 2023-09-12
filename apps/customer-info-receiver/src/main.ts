import { NestFactory } from '@nestjs/core';
import { CustomerInfoReceiverModule } from './customer-info-receiver.module';
import { RmqService } from '@app/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CustomerInfoReceiverModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('RECEIVER'));

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.startAllMicroservices();
}
bootstrap();
