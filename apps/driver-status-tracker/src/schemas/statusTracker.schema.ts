import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class StatusTracker extends AbstractDocument {
    @Prop()
    driver_id: string;

    @Prop()
    reliable: number;

    @Prop([Number])
    ratings: number[];
}

export const StatusTrackerSchema = SchemaFactory.createForClass(StatusTracker);