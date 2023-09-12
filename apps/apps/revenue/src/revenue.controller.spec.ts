import { Test, TestingModule } from '@nestjs/testing';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';

describe('RevenueController', () => {
  let revenueController: RevenueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RevenueController],
      providers: [RevenueService],
    }).compile();

    revenueController = app.get<RevenueController>(RevenueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(revenueController.getHello()).toBe('Hello World!');
    });
  });
});
