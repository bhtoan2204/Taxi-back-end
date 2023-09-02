import { Injectable } from '@nestjs/common';
import { BookingRequestRepository } from 'apps/customer-info-receiver/src/repositories/bookingRequest.repository';
import SearchService from './other_services/search.service';


@Injectable()
export class CustomerInfoReceiverService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
    private readonly searchService: SearchService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getMessage(data: any) {
    console.log('goes here')
    console.log(data);
  }

  async getAllBookingRequest() {
    return await this.bookingRequestRepository.find({});
  }

  async searchBookingRequest(text: string, offset?: number, limit?: number, startId?: number) {
    try {
      const { results, count } = await this.searchService.search(
        text,
        offset,
        limit,
        startId,
      );
      const ids = results.map((result) => result._id);

      console.log(ids);

      console.log(results);

      if (!ids.length) {
        return {
          items: [],
          count,
        };
      }
      const items = await this.bookingRequestRepository.find({
        _id: { $in: ids }
      });
      return {
        items,
        count,
      };
    }
    catch (e) {
      throw e;
    }
  }

  async getBookingRequest(offset?: number, limit?: number, startId?: number) {
    try {

    }
    catch (e) {
      throw e;
    }
  }
}
