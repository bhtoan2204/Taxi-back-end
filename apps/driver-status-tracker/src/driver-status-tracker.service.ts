import { Injectable } from '@nestjs/common';
import { StatusTrackerRepository } from './repositories/statusTracker.repository';

@Injectable()
export class DriverStatusTrackerService {
  constructor(
    private readonly statusTrackerRepository: StatusTrackerRepository,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getMessage(data: any) {
  }

  async getAllTrackers(): Promise<any> {
    const sortOptions = { start_time: -1 };
    const trackers = await this.statusTrackerRepository.find({}, sortOptions);

    return trackers;
  }

  async createTrackerInRepository(data: any) {
    const session = await this.statusTrackerRepository.startTransaction();
    try {
      const tracker = await this.statusTrackerRepository.create(data, { session });
      await session.commitTransaction();
      return tracker;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
}
