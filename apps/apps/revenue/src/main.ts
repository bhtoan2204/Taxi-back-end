import { NestFactory } from '@nestjs/core';
import { RevenueModule } from './revenue.module';

async function bootstrap() {
  const app = await NestFactory.create(RevenueModule);
  await app.listen(3000);
}
bootstrap();
