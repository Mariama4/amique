import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Document = HydratedDocument<BotModel>;

@Schema({ collection: 'bots' })
export class BotModel {
	@Prop({ required: true })
	name: string;

	@Prop({
		default: '',
	})
	description: string;

	@Prop({
		default: null,
	})
	pid: number;

	@Prop({ required: true })
	token: string;

	@Prop({ default: false })
	status: boolean;
}

export const BotSchema = SchemaFactory.createForClass(BotModel);
