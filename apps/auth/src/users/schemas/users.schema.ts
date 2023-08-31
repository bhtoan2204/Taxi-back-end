import { AbstractDocument, Role } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { string } from "joi";

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    full_name: string;

    @Prop()
    role: string

    @Prop()
    longtitude: number

    @Prop()
    latitude: number
}

export const UserSchema = SchemaFactory.createForClass(User);