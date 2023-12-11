from handlers import *
from config import FILES_ADDRESS

async def messageDispatcher(frame, update, context):
	match frame['type']:
		case "TEXT":
			return await textHandler(frame, update, context)
		case "PHOTO":
			return await photoHandler(frame, update, context, FILES_ADDRESS)
		case "MEDIA_GROUP":
			return mediaGroupHandler(frame, update, context, FILES_ADDRESS)
		case "VIDEO_NOTE":
			return videoNoteHandler(frame, update, context, FILES_ADDRESS)
		case "VENUE":
			return venueHandler(frame, update, context)
		case "CONTACT":
			return contactHandler(frame, update, context)
		case "WEB_APP":
			return webAppHandler(frame, update)
		case "document":
			return documentHandler(frame, update, context, FILES_ADDRESS)
		case "LOCATION":
			return locationHandler(frame, update, context)
		case "VIDEO":
			return videoHandler(frame, update, context, FILES_ADDRESS)
		case "ANIMATION":
			return animationHandler(frame, update, context, FILES_ADDRESS)
		case "AUDIO":
			return audioHandler(frame, update, context, FILES_ADDRESS)
		case "VOICE":
			return voiceHandler(frame, update, context, FILES_ADDRESS)
		case "POLL":
			# TODO: реализовать
			return None
		case "DICE":
			# TODO: реализовать
			return None
		case _:
			# TODO: выкидывать ошибку и возвращать пользователя в начало start
			pass

