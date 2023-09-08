interface BookingRequestBody {
    id: string;
    phone: string;
    pickup_address: string;
    dropoff_address: string;
    pickup_latitude: number;
    pickup_longitude: number;
}

export default BookingRequestBody;