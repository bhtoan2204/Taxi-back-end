import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CUSTOMER'))
  await app.startAllMicroservices();
}
bootstrap();
