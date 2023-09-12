import { NestFactory } from '@nestjs/core';
import { CustomerReliabilityModule } from './customer-reliability.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerReliabilityModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('RELIABILITY'));

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.startAllMicroservices();
}
bootstrap();
