import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BookingRequest } from '../schema/bookingRequest.schema';
import BookingRequestResult from '../interface/bookingRequest.search-result.interface';
import BookingRequestBody from '../interface/bookingRequest.search-body.interface';
import BookingRequestCountResult from '../interface/bookingRequest.count-result.interface';

@Injectable()
export default class SearchService {
    index = 'bookingrequests';

    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async indexBookingRequest(bookingRequest: BookingRequest) {
        return this.elasticsearchService.index<BookingRequestResult, BookingRequestBody>({
                index: this.index,
                body: {
                    _id: bookingRequest._id,
                    phone: bookingRequest.phone,
                    pickup_address: bookingRequest.pickup_address,
                    dropoff_address: bookingRequest.dropoff_address
                },
            });
    }

    async count(query: string, fields: string[]) {
        const { body } = await this.elasticsearchService.count<BookingRequestCountResult>({
            index: this.index,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields,
                    },
                },
            },
        });
        return body.count;
    }

    async search(text: string, offset?: number, limit?: number, startId = 0) {
        let separateCount = 0;
        if (startId) {
            separateCount = await this.count(text, ['phone', 'pickup_address']);
        }
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
                        ],
                    },
                },
            },
        });
        const count = body.hits.total.value;
        const hits = body.hits.hits;
        const results = hits.map((item) => item._source);

        console.log('aaaaaaaaaaaaaaaaaaaaa');

        console.log(hits);

        console.log('aaaaaaaaaaaaaaaaaaaaa');

        return {
            count: startId ? separateCount : count,
            results,
        };
    }
}