import { Injectable } from '@nestjs/common';
import { BookingRequestRepository } from 'apps/customer-info-receiver/src/repositories/bookingRequest.repository';
import { Status } from '@app/common';
import { SearchService } from '@app/common/elasticsearch/search.service';
import { UsersRepository } from './repositories/users.repository';


@Injectable()
export class CustomerInfoReceiverService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
    private readonly searchService: SearchService,
    private readonly userRepository: UsersRepository
  ) { }
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
      const ids = results.map((result) => result.id);
      
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
      return await this.bookingRequestRepository.find({
        
      });
    }
    catch (e) {
      throw e;
    }
  }

  async createBookingRequest(data: any) {
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.create(data, { session });
      await session.commitTransaction();
      this.searchService.indexBookingRequest(bookingRequest);
      return bookingRequest;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }

  async getHistory(_id: string){
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.find({customer_id: _id, status: Status.COMPLETED});
      return bookingRequest;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
  async createBookingRequestByCustomer(data: any, _id: string) {
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.create({
        customer_id: _id,
        ...data
      }, { session });
      const user = await this.userRepository.findOne({ _id: _id });
      if (!user.is_Vip) {
        const total = user.total_booking + 1
        await this.userRepository.findOneAndUpdate({ _id: _id }, { total_booking: total });
        if (total == 10) {
          await this.userRepository.findOneAndUpdate({ _id: _id }, { is_Vip: true });
        }
      }
      await session.commitTransaction();
      this.searchService.indexBookingRequest(bookingRequest);
      return bookingRequest;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }
}
