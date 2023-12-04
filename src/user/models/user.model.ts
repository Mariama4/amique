import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
	id: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ default: 'USER', enum: ['ADMIN', 'USER'] })
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
