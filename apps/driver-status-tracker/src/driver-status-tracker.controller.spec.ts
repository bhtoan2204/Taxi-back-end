import { Test, TestingModule } from '@nestjs/testing';
import { DriverStatusTrackerController } from './driver-status-tracker.controller';
import { DriverStatusTrackerService } from './driver-status-tracker.service';

describe('DriverStatusTrackerController', () => {
  let driverStatusTrackerController: DriverStatusTrackerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DriverStatusTrackerController],
      providers: [DriverStatusTrackerService],
    }).compile();

    driverStatusTrackerController = app.get<DriverStatusTrackerController>(DriverStatusTrackerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(driverStatusTrackerController.getHello()).toBe('Hello World!');
    });
  });
});
