from utils import markupBuilder

# TODO: протестировать
async def photoHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['photo']['caption']
	filePath = frame['photo']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	photoUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_photo(
		chat_id = update.message.chat_id,
		photo = photoUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)