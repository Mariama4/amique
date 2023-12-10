from handlers import *

async def messageDispatcher(frame, update, context):
	match frame['type']:
		case "TEXT":
			return await textHandler(frame, update, context)
		case "PHOTO":
			return photoHandler(data, message, bot, API_PUBLIC)
		case "MEDIA_GROUP":
			return mediaGroupHandler(data, message, bot, API_PUBLIC)
		case "VIDEO_NOTE":
			return videoNoteHandler(data, message, bot, API_PUBLIC)
		case "VENUE":
			return venueHandler(data, message, bot)
		case "CONTACT":
			return contactHandler(data, message, bot)
		case "WEB_APP":
			return webAppHandler(data, message)
		case "document":
			return documentHandler(data, message, bot, API_PUBLIC)
		case "LOCATION":
			return locationHandler(data, message, bot)
		case "VIDEO":
			return videoHandler(data, message, bot, API_PUBLIC)
		case "ANIMATION":
			return animationHandler(data, message, bot, API_PUBLIC)
		case "AUDIO":
			return audioHandler(data, message, bot, API_PUBLIC)
		case "VOICE":
			return voiceHandler(data, message, bot, API_PUBLIC)
		case "POLL":
			return None
		case "DICE":
			return None
		case _:
			# TODO: выкидывать ошибку и возвращать пользователя в начало start
			pass

