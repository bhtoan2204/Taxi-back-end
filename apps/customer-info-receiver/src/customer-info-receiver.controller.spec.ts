import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInfoReceiverController } from './customer-info-receiver.controller';
import { CustomerInfoReceiverService } from './customer-info-receiver.service';

describe('CustomerInfoReceiverController', () => {
  let customerInfoReceiverController: CustomerInfoReceiverController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerInfoReceiverController],
      providers: [CustomerInfoReceiverService],
    }).compile();

    customerInfoReceiverController = app.get<CustomerInfoReceiverController>(CustomerInfoReceiverController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customerInfoReceiverController.getHello()).toBe('Hello World!');
    });
  });
});
