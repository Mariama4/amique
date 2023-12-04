class FramePhoto {
	src: string;

	caption: string;
}

class FrameVideo {
	src: string;

	caption: string;
}

class FrameAnimation {
	src: string;

	caption: string;
}

class FrameDocument {
	src: string;

	caption: string;
}

class FrameAudio {
	src: string;

	caption: string;
}

class FrameVoice {
	src: string;

	caption: string;
}

class FrameVideoNote {
	src: string;

	caption: string;
}

class FrameMediaGroup {
	src: [string];

	caption: string;
}

class FrameLocation {
	latitude: string;

	longitude: string;

	horizontal_accuracy: string;

	caption: string;
}

class FrameVenue {
	latitude: string;

	longitude: string;

	title: string;

	address: string;

	caption: string;
}

class FrameContact {
	phone_number: string;

	first_name: string;

	second_name: string;

	caption: string;
}

class FrameWebApp {
	src: string;

	button_text: string;

	caption: string;
}

class FrameMarkup {
	text: string;

	next_frame_id: string;
}

export class CreateFrame {
	bot_id: string;

	frame_name: string;

	next_frame_name: string;

	disable_web_page_preview: boolean;

	type: string;

	parse_mode: string;

	text: string;

	photo: FramePhoto;

	video: FrameVideo;

	animation: FrameAnimation;

	document: FrameDocument;

	audio: FrameAudio;

	voice: FrameVoice;

	video_note: FrameVideoNote;

	media_group: FrameMediaGroup;

	location: FrameLocation;

	venue: FrameVenue;

	contact: FrameContact;

	web_app: FrameWebApp;

	markup: [FrameMarkup];
}
