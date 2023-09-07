import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { CreateBookingRequest } from './dto/createBookingRequest.request';
import {SearchService} from '@app/common/elasticsearch/search.service';
import { UsersRepository } from './users/users.repository';
import { RECEIVER_SERVICE } from '../constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
    private readonly searchService: SearchService,
    private readonly userRepository: UsersRepository,
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy
  ) { }
  getHello(): string {
    return 'Hello World! From Customer';
  }

  async createBookingRequest(data: CreateBookingRequest) {
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

  async setLatLong(_id: string, dto: any) {
    const session = await this.bookingRequestRepository.startTransaction();
    const filterQuery = { _id: _id }
    const updateQuery = { latitude: dto.latitude, longitude: dto.longitude }
    try {
      const updatedUser = await this.userRepository.findOneAndUpdate(filterQuery, updateQuery);
      await session.commitTransaction();
      return { latitude: updatedUser.latitude, longitude: updatedUser.longitude };
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }

  async getHistory(_id: string) {
    try {
      const check = this.receiverClient.send('get_history', { _id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw new UnauthorizedException('Token expired or ' + e);
    }
  }
}
