import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LOCATE_SERVICE, RECEIVER_SERVICE } from './constants/services';
import { FirebaseService } from '@app/common/firebase/firebase.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_PHONE_NUMBER: Joi.string().required()
      }),
      envFilePath: './apps/driver/.env'
    }),
    MongooseModule,
    DatabaseModule,
    AuthModule,
    RmqModule.register({
      name: LOCATE_SERVICE
    }),
    RmqModule.register({
      name: RECEIVER_SERVICE
    }),
  ],
  controllers: [DriverController],
  providers: [DriverService, FirebaseService],
})
export class DriverModule {}
