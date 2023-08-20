import { NestFactory } from '@nestjs/core';
import { BookingsModule } from './bookings.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BOOKING'))
  await app.startAllMicroservices();
}
bootstrap();
