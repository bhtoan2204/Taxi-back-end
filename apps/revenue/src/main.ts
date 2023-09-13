import { NestFactory } from '@nestjs/core';
import { RevenueModule } from './revenue.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(RevenueModule);
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
