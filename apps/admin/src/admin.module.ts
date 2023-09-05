import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RECEIVER_SERVICE, LOCATE_SERVICE, TRACKER_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.number().required(),
        }),
        envFilePath: './apps/admin/.env'
      }
    ),
    DatabaseModule,
    MongooseModule,
    RmqModule.register({
      name: RECEIVER_SERVICE
    }),
    RmqModule.register({
      name: LOCATE_SERVICE
    }),
    RmqModule.register({
      name: TRACKER_SERVICE
    }),
    AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
