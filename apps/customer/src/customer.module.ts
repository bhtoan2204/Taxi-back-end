import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { BookingRequest, BookingRequestSchema } from './schema/bookingRequest.schema';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { UsersRepository } from './repositories/users.repository';
import { User, UserSchema } from './schema/users.schema';
import { LOCATE_SERVICE, RECEIVER_SERVICE, TRACKER_SERVICE } from './constant/services';
import { SearchService } from '@app/common/elasticsearch/search.service';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.string().required()
        }),
        envFilePath: './apps/customer/.env'
      }
    ),
    DatabaseModule,
    RmqModule.register({
      name: RECEIVER_SERVICE
    }),
    RmqModule.register({
      name: LOCATE_SERVICE
    }),
    RmqModule.register({
      name: TRACKER_SERVICE
    }),
    AuthModule
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService],
})
export class CustomerModule { }
