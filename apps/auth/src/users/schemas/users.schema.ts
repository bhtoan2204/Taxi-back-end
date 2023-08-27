import { AbstractDocument, Role } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User);