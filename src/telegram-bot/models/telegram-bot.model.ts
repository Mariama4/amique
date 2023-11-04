import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TelegramBotDocument = HydratedDocument<TelegramBotModel>;

@Schema()
export class TelegramBotModel {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({
		default: null,
	})
	pid: number;

	@Prop({ required: true })
	token: string;

	@Prop({ default: false })
	status: boolean;
}

export const TelegramBotSchema = SchemaFactory.createForClass(TelegramBotModel);
