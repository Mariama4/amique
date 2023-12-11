from utils import markupBuilder

# TODO: протестировать
async def animationHandler(frame, update, context, SERVER_ADDRESS) -> None:
	caption = frame['animation']['caption']
	filePath = frame['animation']['source']
	reply_markup = markupBuilder(frame['markup'])
	parse_mode = frame['parseMode']
	animationUrl = f'{SERVER_ADDRESS}{filePath}'

	await context.bot.send_animation(
		chat_id = update.message.chat_id,
		animation = animationUrl,
		caption = caption,
		reply_markup = reply_markup,
		parse_mode = parse_mode
	)