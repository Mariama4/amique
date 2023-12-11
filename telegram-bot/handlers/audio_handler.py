from utils import markupBuilder

# TODO: протестировать
async def audioHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['audio']['caption']
	filePath = frame['audio']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	audioUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_audio(
		chat_id = update.message.chat_id,
		audio = audioUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)