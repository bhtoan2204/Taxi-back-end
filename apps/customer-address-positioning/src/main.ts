import { NestFactory } from '@nestjs/core';
import { CustomerAddressPositioningModule } from './customer-address-positioning.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerAddressPositioningModule);
  await app.listen(3000);
}
bootstrap();
