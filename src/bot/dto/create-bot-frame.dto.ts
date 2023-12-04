class FramePhoto {
	source: string;
	caption: string;
}

class FrameVideo {
	source: string;
	caption: string;
}

class FrameAnimation {
	source: string;
	caption: string;
}

class FrameDocument {
	source: string;
	caption: string;
}

class FrameAudio {
	source: string;
	caption: string;
}

class FrameVoice {
	source: string;
	caption: string;
}

class FrameVideoNote {
	source: string;
	caption: string;
}

class FrameMediaGroup {
	source: [string];
	caption: string;
}

class FrameLocation {
	latitude: string;
	longitude: string;
	horizontalAccuracy: string;
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
	phoneNumber: string;
	firstName: string;
	secondName: string;
	caption: string;
}

class FrameWebApp {
	source: string;
	buttonText: string;
	caption: string;
}

class FrameMarkup {
	text: string;
	nextFrameId: string;
}

export class CreateFrame {
	name: string;
	description: string;
	nextFrameId: string;
	disableWebPagePreview: boolean;
	type: string;
	parseMode: string;
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
