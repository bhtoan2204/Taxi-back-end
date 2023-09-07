import { NestFactory } from '@nestjs/core';
import { DriverStatusTrackerModule } from './driver-status-tracker.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(DriverStatusTrackerModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TRACKER'));

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  
  await app.startAllMicroservices();
}
bootstrap();
