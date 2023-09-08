import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories/users.repository';
import { User, UserSchema } from './schema/users.schema';
import { LOCATE_SERVICE, RECEIVER_SERVICE } from './constants/services';

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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  providers: [DriverService, UsersRepository],
})
export class DriverModule {}
