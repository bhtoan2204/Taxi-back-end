import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class RefreshToken extends AbstractDocument {
    @Prop()
    refresh_token: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);