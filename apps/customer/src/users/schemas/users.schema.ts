import { AbstractDocument, Role } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    full_name: string;

    @Prop({ type: String, enum: Role })
    role: string

    @Prop()
    longitude: number

    @Prop()
    latitude: number
}

export const UserSchema = SchemaFactory.createForClass(User);