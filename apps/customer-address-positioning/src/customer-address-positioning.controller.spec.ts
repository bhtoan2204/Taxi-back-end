import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressPositioningController } from './customer-address-positioning.controller';
import { CustomerAddressPositioningService } from './customer-address-positioning.service';

describe('CustomerAddressPositioningController', () => {
  let customerAddressPositioningController: CustomerAddressPositioningController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressPositioningController],
      providers: [CustomerAddressPositioningService],
    }).compile();

    customerAddressPositioningController = app.get<CustomerAddressPositioningController>(CustomerAddressPositioningController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customerAddressPositioningController.getHello()).toBe('Hello World!');
    });
  });
});
