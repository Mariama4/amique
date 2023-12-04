import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export type BotsFramesDocument = HydratedDocument<BotsFramesModel>;

@Schema({ collection: 'users_bots', timestamps: true })
export class BotsFramesModel {
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'tbs' })
	tbId: Types.ObjectId;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'tb_frames' })
	tbFrameId: Types.ObjectId;
}

export const BotsFramesSchema = SchemaFactory.createForClass(BotsFramesModel);
