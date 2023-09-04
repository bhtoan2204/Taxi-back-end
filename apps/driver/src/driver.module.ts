import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverMiddleware } from './driver.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/driver/.env'
    }),
    MongooseModule,
    DatabaseModule,
    AuthModule,
    RmqModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DriverMiddleware).forRoutes(DriverController);
  }
}
