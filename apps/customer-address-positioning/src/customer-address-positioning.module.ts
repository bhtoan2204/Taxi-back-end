import { Module } from '@nestjs/common';
import { CustomerAddressPositioningController } from './customer-address-positioning.controller';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { UsersRepository } from './repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_LOCATE_QUEUE: Joi.string().required()
      }),
      envFilePath: './apps/customer-address-positioning/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RmqModule,
    AuthModule
  ],
  controllers: [CustomerAddressPositioningController],
  providers: [
    CustomerAddressPositioningService,
    UsersRepository],
})
export class CustomerAddressPositioningModule {}
