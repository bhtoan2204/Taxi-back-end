import { Module } from '@nestjs/common';
import { CustomerInfoReceiverController } from './customer-info-receiver.controller';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';

@Module({
  imports: [],
  controllers: [CustomerInfoReceiverController],
  providers: [CustomerInfoReceiverService],
})
export class CustomerInfoReceiverModule {}
