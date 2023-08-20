import { NestFactory } from '@nestjs/core';
import { DriverStatusTrackerModule } from './driver-status-tracker.module';

async function bootstrap() {
  const app = await NestFactory.create(DriverStatusTrackerModule);
  await app.listen(3000);
}
bootstrap();
