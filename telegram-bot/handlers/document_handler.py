from utils import markupBuilder

# TODO: протестировать
async def documentHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['document']['caption']
	filePath = frame['document']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	documentUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_document(
		chat_id = update.message.chat_id,
		document = documentUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)