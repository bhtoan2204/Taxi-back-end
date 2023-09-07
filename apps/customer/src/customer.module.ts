import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { BookingRequest, BookingRequestSchema } from './schema/bookingRequest.schema';
import SearchService from '@app/common/elasticsearch/search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { UsersRepository } from './users/users.repository';
import { User, UserSchema } from './users/schemas/users.schema';

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
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
    RmqModule,
    AuthModule,
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
    })],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    BookingRequestRepository,
    SearchService,
    UsersRepository],
})
export class CustomerModule {}
