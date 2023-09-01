import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // MQ CONFIG
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  // SWAGGER CONFIG
  // const configSwagger = new DocumentBuilder()
  //   .setTitle('Authentication')
  //   .setDescription('Authentication API')
  //   .setVersion('1.0')
  //   .addTag('taxi')
  //   .build()
  

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
