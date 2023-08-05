import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class Booking extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    booking_id: number;

    @Prop()
    customer_id: number;

    @Prop()
    driver_id: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking)