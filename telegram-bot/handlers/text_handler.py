from utils import markupBuilder

async def textHandler(frame, update, context):
	text = frame['text']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	print('hi')
	await context.bot.send_message(
		chat_id = update.message.chat_id,
		text = text,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)