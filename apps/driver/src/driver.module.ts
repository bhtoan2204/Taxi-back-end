import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AuthModule, DatabaseModule } from '@app/common';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    envFilePath: './apps/driver/.env'
  }), DatabaseModule, AuthModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
