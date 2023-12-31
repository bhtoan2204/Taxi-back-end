import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BookingRequest } from './schema/bookingRequest.schema';
import BookingRequestResult from './interface/bookingRequest.search-result.interface';
import BookingRequestBody from './interface/bookingRequest.search-body.interface';

@Injectable()
export class SearchService {
    index = 'bookingrequests';

    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async indexBookingRequest(bookingRequest: BookingRequest) {
        return this.elasticsearchService.index<BookingRequestResult, BookingRequestBody>({
            index: this.index,
            body: {
                id: bookingRequest._id.toString(),
                phone: bookingRequest.phone,
                pickup_address: bookingRequest.pickup_address,
                dropoff_address: bookingRequest.dropoff_address,
                pickup_latitude: bookingRequest.pickup_latitude,
                pickup_longitude: bookingRequest.pickup_longitude
            },
        });
    }

    async search(text: string) {
        const { body } = await this.elasticsearchService.search<BookingRequestResult>({
            index: this.index,
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                match: {
                                    pickup_address: text,
                                },
                            },
                            {
                                match: {
                                    phone: text,
                                },
                            },
                            {
                                match: {
                                    dropoff_address: text,
                                },
                            },
                        ],
                    },
                },
            },
        });
        const hits = body.hits.hits;
        const results = hits.map((item) => item._source);

        return {
            results,
        };
    }
}