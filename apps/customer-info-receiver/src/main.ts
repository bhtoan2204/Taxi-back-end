import { NestFactory } from '@nestjs/core';
import { CustomerInfoReceiverModule } from './customer-info-receiver.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerInfoReceiverModule);
  await app.listen(3000);
}
bootstrap();
