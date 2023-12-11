from utils import markupBuilder

# TODO: протестировать
async def videoHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['video']['caption']
	filePath = frame['video']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	videoUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_video(
		chat_id = update.message.chat_id,
		video = videoUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)