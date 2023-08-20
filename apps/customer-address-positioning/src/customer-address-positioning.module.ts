import { Module } from '@nestjs/common';
import { CustomerAddressPositioningController } from './customer-address-positioning.controller';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';

@Module({
  imports: [],
  controllers: [CustomerAddressPositioningController],
  providers: [CustomerAddressPositioningService],
})
export class CustomerAddressPositioningModule {}
