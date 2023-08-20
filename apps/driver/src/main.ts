import { NestFactory } from '@nestjs/core';
import { DriverModule } from './driver.module';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(DriverModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
