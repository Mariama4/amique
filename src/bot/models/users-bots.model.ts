import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export type UsersBotsDocument = HydratedDocument<UsersBotsModel>;

@Schema({ collection: 'users_bots', timestamps: true })
export class UsersBotsModel {
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'users' })
	userId: Types.ObjectId;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'bots' })
	tbId: Types.ObjectId;
}

export const UsersBotsSchema = SchemaFactory.createForClass(UsersBotsModel);
