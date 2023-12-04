import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { UserModel } from 'src/user/models/user.model';

export type FrameDocument = HydratedDocument<FrameModel>;

class FramePhoto {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameVideo {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameAnimation {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class _FrameDocument {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameAudio {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameVoice {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameVideoNote {
	@Prop()
	src: string;

	@Prop()
	caption: string;
}

class FrameMediaGroup {
	@Prop()
	src: [string];

	@Prop()
	caption: string;
}

class FrameLocation {
	@Prop()
	latitude: string;

	@Prop()
	longitude: string;

	@Prop()
	horizontal_accuracy: string;

	@Prop()
	caption: string;
}

class FrameVenue {
	@Prop()
	latitude: string;

	@Prop()
	longitude: string;

	@Prop()
	title: string;

	@Prop()
	address: string;

	@Prop()
	caption: string;
}

class FrameContact {
	@Prop()
	phone_number: string;

	@Prop()
	first_name: string;

	@Prop()
	second_name: string;

	@Prop()
	caption: string;
}

class FrameWebApp {
	@Prop()
	src: string;

	@Prop()
	button_text: string;

	@Prop()
	caption: string;
}

class FrameMarkup {
	@Prop()
	text: string;

	@Prop()
	next_frame_id: string;
}

@Schema({ collection: 'frames', timestamps: true })
export class FrameModel {
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: UserModel.name })
	bot_id: Types.ObjectId;

	@Prop({ required: true })
	frame_name: string;

	@Prop({ required: true })
	next_frame_name: string;

	@Prop()
	disable_web_page_preview: boolean;

	@Prop({ required: true, default: 'text' })
	type: string;

	@Prop({ required: true, default: 'html' })
	parse_mode: string;

	@Prop()
	text: string;

	@Prop()
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
