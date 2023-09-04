import BookingRequestBody from "./bookingRequest.search-body.interface";

interface BookingRequestResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: BookingRequestBody;
    }>;
  };
}

export default BookingRequestResult;