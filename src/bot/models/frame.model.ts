import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { UserModel } from 'src/user/models/user.model';

export type FrameDocument = HydratedDocument<FrameModel>;

class FramePhoto {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameVideo {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameAnimation {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class _FrameDocument {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameAudio {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameVoice {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameVideoNote {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameMediaGroup {
	@Prop({ default: [''] })
	source: [string];

	@Prop({ default: '' })
	caption: string;
}

class FrameLocation {
	@Prop({ default: '' })
	latitude: string;

	@Prop({ default: '' })
	longitude: string;

	@Prop({ default: '' })
	horizontalAccuracy: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameVenue {
	@Prop({ default: '' })
	latitude: string;

	@Prop({ default: '' })
	longitude: string;

	@Prop({ default: '' })
	title: string;

	@Prop({ default: '' })
	address: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameContact {
	@Prop({ default: '' })
	phoneNumber: string;

	@Prop({ default: '' })
	firstName: string;

	@Prop({ default: '' })
	secondName: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameWebApp {
	@Prop({ default: '' })
	source: string;

	@Prop({ default: '' })
	buttonText: string;

	@Prop({ default: '' })
	caption: string;
}

class FrameMarkup {
	@Prop({ default: '' })
	text: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'frames' })
	nextFrameId: Types.ObjectId;
}

@Schema({ collection: 'frames', timestamps: true })
export class FrameModel {
	id: string;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'bots' })
	botId: Types.ObjectId;

	@Prop({ required: true })
	name: string;

	@Prop({
		default: '',
	})
	description: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'frames' })
	nextFrameId: Types.ObjectId;

	@Prop({
		required: true,
		enum: [
			'TEXT',
			'PHOTO',
			'MEDIA_GROUP',
			'VIDEO_NOTE',
			'VENUE',
			'CONTACT',
			'WEB_APP',
			'DOCUMENT',
			'LOCATION',
			'VIDEO',
			'ANIMATION',
			'VIDEO',
			'VOICE',
		],
	})
	type: string;

	@Prop({ required: true, enum: ['HTML', 'Markdown'] })
	parseMode: string;

	@Prop({ required: true })
	disableWebPagePreview: boolean;

	@Prop({ default: '' })
	text: string;

	@Prop({ default: FramePhoto })
	photo: FramePhoto;

	@Prop()
	video: FrameVideo;

	@Prop()
	animation: FrameAnimation;

	@Prop()
	document: _FrameDocument;

	@Prop()
	audio: FrameAudio;

	@Prop()
	voice: FrameVoice;

	@Prop()
	video_note: FrameVideoNote;

	@Prop()
	media_group: FrameMediaGroup;

	@Prop()
	location: FrameLocation;

	@Prop()
	venue: FrameVenue;

	@Prop()
	contact: FrameContact;

	@Prop()
	web_app: FrameWebApp;

	@Prop()
	markup: [FrameMarkup];
}

export const FrameSchema = SchemaFactory.createForClass(FrameModel);
