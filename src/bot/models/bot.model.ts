import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export type BotDocument = HydratedDocument<BotModel>;

@Schema({ collection: 'bots' })
export class BotModel {
	id: string;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'users' })
	userId: Types.ObjectId;

	@Prop({ required: true })
	name: string;

	@Prop({
		default: '',
	})
	description: string;

	@Prop({ required: true })
	token: string;

	@Prop({ default: false })
	status: boolean;
}

export const BotSchema = SchemaFactory.createForClass(BotModel);
