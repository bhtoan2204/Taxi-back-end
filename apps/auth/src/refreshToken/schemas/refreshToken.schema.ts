import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ versionKey: false })
export class RefreshToken extends AbstractDocument {
    @Prop()
    refresh_token: string

    @Prop({ type: SchemaTypes.ObjectId })
    user_id: Types.ObjectId

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);