export const BOT_ALREADY_CREATED_ERROR = {
	error: 'Такой бот уже есть',
	message: 'Бот с таким именем уже был создан у данного пользователя',
};

export const BOT_NOT_CREATED_ERROR = {
	error: 'Бота не существует',
	message: 'Данного бота не существует у пользователя',
};

export const FRAME_ALREADY_CREATED_ERROR = {
	error: 'Такой фрейм уже был создан',
	message: 'Фрейм с таким именем уже был создан у данного бота',
};

export const FRAME_NOT_CREATED_ERROR = {
	error: 'Такой фрейм не существует',
	message: 'Фрейм с таким именем не существует у данного бота',
};

export const SAME_STATUS_ERROR = 'Бот уже имеет данный статус';
export const UNEXPECTED_CREATE_BOT_ERROR = 'Непредвиденная ошибка при создании бота';

export enum FRAME_PARSE_TYPE {
	HTML = 'HTML',
	MD = 'Markdown',
}

export enum FRAME_TYPE {
	TEXT = 'TEXT',
	PHOTO = 'PHOTO',
	MEDIA_GROUP = 'MEDIA_GROUP',
	VIDEO_NOTE = 'VIDEO_NOTE',
	VENUE = 'VENUE',
	CONTACT = 'CONTACT',
	WEB_APP = 'WEB_APP',
	DOCUMENT = 'DOCUMENT',
	LOCATION = 'LOCATION',
	VIDEO = 'VIDEO',
	ANIMATION = 'ANIMATION',
	VOICE = 'VOICE',
}
