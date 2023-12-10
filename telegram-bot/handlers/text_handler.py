from utils import markupBuilder

# TODO: добавить типизацию / интерфейсы
async def textHandler(frame, update, context) -> None:
	text = frame['text']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']

	await context.bot.send_message(
		chat_id = update.message.chat_id,
		text = text,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)