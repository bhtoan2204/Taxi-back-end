import { Injectable } from '@nestjs/common';
import { BookingRequestRepository } from 'apps/customer-info-receiver/src/repositories/bookingRequest.repository';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class CustomerInfoReceiverService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
    private readonly elasticsearchService: ElasticsearchService
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

  async searchBookingRequest(dto: any) {
    const { phone, pickup_address, car_type } = dto;
    try {
      const result = await this.elasticsearchService.search({
        index: 'bookingrequests', // Thay đổi thành tên index của bạn
        body: {
          query: {
            bool: {
              must: [
                { match: { phone } },
                { match: { car_type } },
                { match: { pickup_address } },
              ],
            },
          },
        },
      });

      console.log(result);
      
      // Lấy danh sách các tài liệu kết quả
      const bookingRequests = result.hits.hits.map((hit) => hit._source);
      return bookingRequests;
    }
    catch (e) {
      throw e;
    }
  }
}
