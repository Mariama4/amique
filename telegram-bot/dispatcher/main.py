def messageDispatcher(nextFrame, userText, update):
	match nextFrame['type']:
		case "text":
			return textMessageHandler(data, message)
		case "photo":
			return photoMessageHandler(data, message, bot, API_PUBLIC)
		case "media_group":
			return mediaGroupMessageHandler(data, message, bot, API_PUBLIC)
		case "video_note":
			return videoNoteMessageHandler(data, message, bot, API_PUBLIC)
		case "venue":
			return venueMessageHandler(data, message, bot)
		case "contact":
			return contactMessageHandler(data, message, bot)
		case "web_app":
			return webAppHandler(data, message)
		case "document":
			return documentMessageHandler(data, message, bot, API_PUBLIC)
		case "location":
			return locationMessageHandler(data, message, bot)
		case "video":
			return videoMessageHandler(data, message, bot, API_PUBLIC)
		case "animation":
			return animationMessageHandler(data, message, bot, API_PUBLIC)
		case "audio":
			return audioMessageHandler(data, message, bot, API_PUBLIC)
		case "voice":
			return voiceMessageHandler(data, message, bot, API_PUBLIC)
		case "stored_frame_id":
			return storedFramesController(data, message, bot, dp)
		case _:
			# not found
			pass

