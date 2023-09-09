import { Injectable } from '@nestjs/common';
import { StatusTrackerRepository } from './repositories/statusTracker.repository';
import { float } from '@elastic/elasticsearch/api/types';

@Injectable()
export class DriverStatusTrackerService {
  constructor(
    private readonly statusTrackerRepository: StatusTrackerRepository,
  ) { }

  async getAllTrackers(): Promise<any> {
    const sortOptions = { start_time: -1 };
    const trackers = await this.statusTrackerRepository.find({}, sortOptions);

    return trackers;
  }

  async addRating(data: any) {
    const driver_id = data.driver_id;
    const rate = data.rate as float;
    let tracker = await this.statusTrackerRepository.findOrFail({ driver_id });
    if (!tracker) {
      tracker = await this.statusTrackerRepository.create({
        driver_id: data.driver_id,
        reliable: 0,
        ratings: [rate]
      });
      return tracker;
    }
    else {
      let ratings = [...tracker.ratings, rate] as float[];
      const average = (ratings.reduce((acc, val) => acc + val, 0)) / ratings.length;

      tracker = await this.statusTrackerRepository.findOneAndUpdate({ driver_id: driver_id }, {
        ratings: ratings,
        reliable: average.toFixed(2)
      });
      return tracker;
    }
  }
}
