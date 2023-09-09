import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingRequestRepository } from 'apps/customer-info-receiver/src/repositories/bookingRequest.repository';
import { Status } from '@app/common';
import { SearchService } from '@app/common/elasticsearch/search.service';
import { UsersRepository } from './repositories/users.repository';


function getDistance(fromLat: number, fromLong: number, toLat: number, toLong: number) {
  const earthRadiusKm = 6371;
  const fromLatRad = fromLat * (Math.PI / 180);
  const fromLongRad = fromLong * (Math.PI / 180);
  const toLatRad = toLat * (Math.PI / 180);
  const toLongRad = toLong * (Math.PI / 180);

  const dLat = toLatRad - fromLatRad;
  const dLong = toLongRad - fromLongRad;

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(fromLatRad) * Math.cos(toLatRad) * Math.sin(dLong / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}

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
      return await this.bookingRequestRepository.find({});
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

  async getHistoryCustomer(_id: string) {
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.find({ customer_id: _id, status: Status.COMPLETED });
      return bookingRequest;
    }
    catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }

  async getHistoryDriver(_id: string) {
    const session = await this.bookingRequestRepository.startTransaction();
    try {
      const bookingRequest = await this.bookingRequestRepository.find({ driver_id: _id, status: Status.COMPLETED });
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

  async getNearbyBookingRequest(dto: any) {
    try {
      const bookingRequest = await this.bookingRequestRepository.find({ status: Status.PENDING });
      const results = []
      for (let i = 0; i < bookingRequest.length; i++) {
        let flight_distance = getDistance(dto.latitude, dto.longitude, bookingRequest[i].pickup_latitude, bookingRequest[i].pickup_longitude);
        flight_distance = +flight_distance.toFixed(2);
        let result = {
          flight_distance: flight_distance,
          ...bookingRequest[i]
        }
        results.push(result);
      }
      results.sort((a, b) => a.flight_distance - b.flight_distance);
      const top5Nearest = results.slice(0, 5);
      return top5Nearest;
    }
    catch (e) {
      throw e;
    }
  }

  async getStatistics() {
    try {
      const total_request = await this.bookingRequestRepository.count({});
      const total_completed_request = await this.bookingRequestRepository.count({ status: Status.COMPLETED });
      const total_price = await this.bookingRequestRepository.calculateTotalPriceByQuery({});
      const total_price_completed = await this.bookingRequestRepository.calculateTotalPriceByQuery({ status: Status.COMPLETED });
      let profit = total_price * 0.3;
      profit = +profit.toFixed(2);

      return { total_request, total_completed_request, total_price, total_price_completed, profit };
    }
    catch (e) {
      throw e;
    }
  }

  async getDriverLocation(bookingId: string) {
    try {
      const bookingRequest = await this.bookingRequestRepository.findOne({ _id: bookingId });
      if (!bookingRequest.driver_id) {
        throw new ConflictException('This Booking Request have not caught by any driver yet');
      }
      const driver = await this.userRepository.findOne({ _id: bookingRequest.driver_id });
      return {
        driver_name: driver.full_name,
        driver_phone: driver.phone,
        driver_lattitude: driver.latitude,
        driver_longitude: driver.longitude
      };
    }
    catch (e) {
      throw e;
    }
  }

  async acceptBookingRequest(driver_id: string, booking_id: string) {
    try {
      const bookingRequest = await this.bookingRequestRepository.findOrFail({
        _id: booking_id
      })
      if (bookingRequest === null) {
        return new NotFoundException('Booking Request not found');
      }
      else {
        if (bookingRequest.driver_id !== "") {
          return new ConflictException('This Booking Request is already in another driver');
        }
        else {
          const result = await this.bookingRequestRepository.findOneAndUpdate(
            { _id: booking_id },
            {
              driver_id: driver_id,
              status: Status.INPROGRESS
            }
          );
          return result;
        }
      }
    }
    catch (e) {
      throw e
    }
  }

  async setCompleted(driver_id: string, booking_id: string) {
    try {
      const bookingRequest = await this.bookingRequestRepository.findOrFail({ _id: booking_id });
      if (bookingRequest === null) {
        return new NotFoundException('Booking Request not found');
      }
      else {
        if (bookingRequest.driver_id !== driver_id) {
          return new ConflictException('This driver has no permission to access this booking request')
        }
        else {
          const result = await this.bookingRequestRepository.findOneAndUpdate(
            { _id: booking_id },
            {
              status: Status.COMPLETED
            }
          );
          return result;
        }
      }
    }
    catch (e) {
      throw e;
    }
  }
}

