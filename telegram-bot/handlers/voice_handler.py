from utils import markupBuilder

# TODO: протестировать
async def voiceHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['voice']['caption']
	filePath = frame['voice']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	voiceUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_voice(
		chat_id = update.message.chat_id,
		voice = voiceUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)