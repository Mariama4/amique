import {
	IsAlpha,
	IsArray,
	IsBoolean,
	IsEnum,
	IsLatitude,
	IsLongitude,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUrl,
	Max,
	Min,
	ValidateNested,
} from 'class-validator';
import { FRAME_PARSE_TYPE, FRAME_TYPE } from '../bot.constants';

class FramePhoto {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameVideo {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameAnimation {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameDocument {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameAudio {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameVoice {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameVideoNote {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameMediaGroup {
	// TODO: проверить правильно ли поставил
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	urls: [string];

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameLocation {
	@IsNotEmpty()
	@IsNumber()
	@IsLatitude()
	latitude: number;

	@IsNotEmpty()
	@IsNumber()
	@IsLongitude()
	longitude: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(1500)
	horizontalAccuracy: number;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameVenue {
	@IsNotEmpty()
	@IsNumber()
	@IsLatitude()
	latitude: string;

	@IsNotEmpty()
	@IsNumber()
	@IsLongitude()
	longitude: string;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	address: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameContact {
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phoneNumber: string;

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	secondName: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameWebApp {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	buttonText: string;

	@IsNotEmpty()
	@IsString()
	caption: string;
}

class FrameMarkup {
	@IsNotEmpty()
	@IsString()
	text: string;

	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	nextFrameId: string;
}

class FramePoll {}

class FrameDice {}

export class CreateFrame {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	botId: string;

	@IsNotEmpty()
	@IsString()
	@IsAlpha()
	name: string;

	@IsOptional()
	//@IsNotEmpty()
	@IsString()
	description?: string;

	@IsOptional()
	//@IsNotEmpty()
	@IsString()
	@IsMongoId()
	nextFrameId?: string;

	@IsNotEmpty()
	@IsBoolean()
	disableWebPagePreview: boolean;

	@IsNotEmpty()
	@IsString()
	@IsEnum(FRAME_TYPE)
	type: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(FRAME_PARSE_TYPE)
	parseMode: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	text?: string;

	@IsOptional()
	@ValidateNested()
	photo?: FramePhoto;

	@IsOptional()
	@ValidateNested()
	video?: FrameVideo;

	@IsOptional()
	@ValidateNested()
	animation?: FrameAnimation;

	@IsOptional()
	@ValidateNested()
	document?: FrameDocument;

	@IsOptional()
	@ValidateNested()
	audio?: FrameAudio;

	@IsOptional()
	@ValidateNested()
	voice?: FrameVoice;

	@IsOptional()
	@ValidateNested()
	videoNote?: FrameVideoNote;

	@IsOptional()
	@ValidateNested()
	mediaGroup?: FrameMediaGroup;

	@IsOptional()
	@ValidateNested()
	location?: FrameLocation;

	@IsOptional()
	@ValidateNested()
	venue?: FrameVenue;

	@IsOptional()
	@ValidateNested()
	contact?: FrameContact;

	@IsOptional()
	@ValidateNested()
	webApp?: FrameWebApp;

	// TODO:
	@IsOptional()
	poll?: FramePoll;

	// TODO:
	@IsOptional()
	dice?: FrameDice;

	@IsOptional()
	@IsArray()
	// TODO:
	//@ValidateNested({ each: true })
	markup?: [FrameMarkup];
}
