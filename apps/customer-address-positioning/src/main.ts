import { NestFactory } from '@nestjs/core';
import { CustomerAddressPositioningModule } from './customer-address-positioning.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerAddressPositioningModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('LOCATE'));

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  
  await app.startAllMicroservices();
}
bootstrap();
