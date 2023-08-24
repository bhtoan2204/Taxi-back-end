import { NestFactory } from '@nestjs/core';
import { CustomerInfoReceiverModule } from './customer-info-receiver.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerInfoReceiverModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('LOCATE'));
  await app.startAllMicroservices();
}
bootstrap();
