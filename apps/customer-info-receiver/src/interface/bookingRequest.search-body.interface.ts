import { Types } from "mongoose";

interface BookingRequestBody {
    _id: Types.ObjectId;
    phone: string;
    pickup_address: string;
    dropoff_address: string;
}

export default BookingRequestBody;