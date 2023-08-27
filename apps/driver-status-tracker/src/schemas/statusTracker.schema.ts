import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class StatusTracker extends AbstractDocument {
    @Prop()
    customer_id: string

    @Prop()
    driver_id: string

    @Prop()
    pickup_location: string;

    @Prop()
    destination_location: string;

    @Prop()
    status: string
}

export const StatusTrackerSchema = SchemaFactory.createForClass(StatusTracker);