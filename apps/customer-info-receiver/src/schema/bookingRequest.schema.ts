import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument, CarType, Status } from "@app/common";
import { string } from "joi";

@Schema({ versionKey: false })
export class BookingRequest extends AbstractDocument {
    @Prop()
    customer_id: string;

    @Prop()
    driver_id: string;

    @Prop({ type: String, enum: Status, default: Status.PENDING })
    status: Status;

    @Prop()
    phone: string

    @Prop({default: new Date().toISOString()})
    booking_time: Date;

    @Prop({ type: String, enum: CarType, default: CarType.BIKE })
    car_type: CarType

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