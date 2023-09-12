import { Module } from '@nestjs/common';
import { CustomerInfoReceiverController } from './customer-info-receiver.controller';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { BookingRequest, BookingRequestSchema } from 'apps/customer-info-receiver/src/schema/bookingRequest.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequestRepository } from '../src/repositories/bookingRequest.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from '@app/common/elasticsearch/search.service';
import { UsersRepository } from './repositories/users.repository';
import { User, UserSchema } from './schema/users.schema';
import { FirebaseService } from '@app/common/firebase/firebase.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RECEIVER_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        ELASTICSEARCH_NODE: Joi.string().required(),
        ELASTICSEARCH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_PASSWORD: Joi.string().required()
      }),
      envFilePath: './apps/customer-info-receiver/.env',
    }),
    RmqModule,
    AuthModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        cloud: { 
          id: configService.get('ELASTICSEARCH_NODE') 
        },
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [CustomerInfoReceiverController],
  providers: [
    CustomerInfoReceiverService,
    BookingRequestRepository,
    SearchService,
    FirebaseService,
    UsersRepository
  ],
})
export class CustomerInfoReceiverModule { }
