import { AbstractDocument, CarType, Status } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Reliability extends AbstractDocument {
    @Prop()
    customer_id: string;

    @Prop([Number])
    price: number[];

    @Prop([Number]) 
    distance: number[];

    @Prop([Number])
    duration: number[];

    @Prop([Number])
    car_type: number[];

    @Prop([Number])
    status: number[];
}

export const ReliabilitySchema = SchemaFactory.createForClass(Reliability);