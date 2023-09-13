import { Module } from '@nestjs/common';
import { CustomerAddressPositioningController } from './customer-address-positioning.controller';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { UsersRepository } from './repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { HttpModule } from '@nestjs/axios';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { BookingRequest, BookingRequestSchema } from './schema/bookingRequest.schema';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_LOCATE_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        HTTP_TIMEOUT: Joi.string().required(),
        HTTP_MAX_REDIRECTS: Joi.string().required(),
        API_KEY: Joi.string().required(),
      }),
      envFilePath: './apps/customer-address-positioning/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
    RmqModule,
    AuthModule,
    HttpModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) =>({
          timeout: configService.get<number>('HTTP_TIMEOUT'),
          maxRedirects: configService.get<number>('HTTP_MAX_REDIRECTS')
      }),
      inject: [ConfigService]
  })
  ],
  controllers: [CustomerAddressPositioningController],
  providers: [
    CustomerAddressPositioningService,
    UsersRepository,
    BookingRequestRepository],
})
export class CustomerAddressPositioningModule { }
