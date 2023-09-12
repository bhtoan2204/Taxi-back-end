import { Injectable } from '@nestjs/common';
import { ReliabilityRepository } from './repositories/reliability.repositories';

@Injectable()
export class CustomerReliabilityService {
  constructor(
    private readonly reliabilityRepository: ReliabilityRepository
  ) { }


  async createDataset(customer_id: string) {
    try {
      await this.reliabilityRepository.create({
        customer_id: customer_id,
        price: [1550000, 35000, 42000, 22000, 30000, 28000],
        distance: [30, 15, 12, 9, 8, 7],
        duration: [30000, 1800, 1500, 1080, 960, 840],
        car_type: [1, 2, 1, 2, 1, 2],
        status: [1, 2, 2, 2, 2, 2]
      });
      return { message: "Dataset created" }
    }
    catch (e) {
      throw e;
    }
  }

  async customerReliability(customer_id: string) {
    try {
      const reliability = this.reliabilityRepository.findOrFail({customer_id});
      if (!reliability){
        this.createDataset(customer_id);
      }
      else{
        
      }
    }
    catch (e) {

    }
  }
}
