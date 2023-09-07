import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  // SWAGGER CONFIG
  const configSwagger = new DocumentBuilder()
    .setTitle('Admin')
    .setDescription('Authentication API')
    .setVersion('1.0')
    .addTag('taxi')
    .addBearerAuth(
      {
        description: "access token",
        name: 'Authentication',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      }, 'authentication'
    )
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('', app, document, {
    customfavIcon: 'https://cdn-icons-png.flaticon.com/512/10095/10095455.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  })

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
