import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enums";

@Schema({versionKey: false})
export class User extends AbstractDocument {
    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    role: string

    @Prop()
    longtitude: string

    @Prop()
    latitude: string
}

export const UserSchema = SchemaFactory.createForClass(User);