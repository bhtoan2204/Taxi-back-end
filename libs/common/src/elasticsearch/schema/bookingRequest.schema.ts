import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class BookingRequest extends AbstractDocument {
    @Prop()
    customer_id: string;

    @Prop()
    phone: string

    @Prop()
    booking_time: Date;

    @Prop()
    car_type: number

    @Prop()
    pickup_address: string;

    @Prop()
    dropoff_address: string;

    @Prop()
    pickup_latitude: number;

    @Prop()
    pickup_longitude: number;

    @Prop()
    dropoff_latitude: number;

    @Prop()
    dropoff_longitude: number;

    @Prop()
    price: number;

    @Prop()
    distance: number;

    @Prop()
    duration: number;
}

export const BookingRequestSchema = SchemaFactory.createForClass(BookingRequest);