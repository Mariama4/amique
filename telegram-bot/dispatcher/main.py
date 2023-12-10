from handlers import *

def messageDispatcher(frame, text, update, context):
	match frame['type']:
		case "text":
			return textHandler(data, message)
		case "photo":
			return photoHandler(data, message, bot, API_PUBLIC)
		case "media_group":
			return mediaGroupHandler(data, message, bot, API_PUBLIC)
		case "video_note":
			return videoNoteHandler(data, message, bot, API_PUBLIC)
		case "venue":
			return venueHandler(data, message, bot)
		case "contact":
			return contactHandler(data, message, bot)
		case "web_app":
			return webAppHandler(data, message)
		case "document":
			return documentHandler(data, message, bot, API_PUBLIC)
		case "location":
			return locationHandler(data, message, bot)
		case "video":
			return videoHandler(data, message, bot, API_PUBLIC)
		case "animation":
			return animationHandler(data, message, bot, API_PUBLIC)
		case "audio":
			return audioHandler(data, message, bot, API_PUBLIC)
		case "voice":
			return voiceHandler(data, message, bot, API_PUBLIC)
		case _:
			# not found
			pass

