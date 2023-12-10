#!/usr/bin/env python

import logging
from telegram import ForceReply, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters
import sys
import argparse
import os
import aiorun
from utils import getNextFrame
from dispatcher import messageDispatcher


# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)



def startBot(schema) -> None:

	BOT = schema['bot']
	FRAMES = dict()

	for frame in schema['frames']:
		FRAMES.update({frame['name']: frame})

	TOKEN = BOT['token']

	# TODO: удалять пользователя, если он вышел из бота
	# user id: state
	USERS = dict()

	# TODO: написать функцию, которая получает цепочку сообщений по nextFrameName и выводит их по цепочке

	async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
		#userResponseText = update.message.text
		
		nextFrame = FRAMES.get('start')

		USERS.update({
			update.message.from_user.id: nextFrame
		})

		await messageDispatcher(nextFrame, update, context)

		# обработка фрейма и вывод того чего надо

		#nextFrame = getNextFrame(FRAMES, currentFrame, userResponseText)
		#user = update.effective_user
		#await update.message.reply_html(
		#	rf"wtf {user.mention_html()}!",
		#	reply_markup=ForceReply(selective=True),
		#)

	async def master_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
		userText = update.message.text
		previousFrame = USERS.get(update.message.from_user.id)
		nextFrame = getNextFrame(FRAMES, previousFrame, userText)

		USERS.update({
			update.message.from_user.id: nextFrame
		})



		# обработка фрейма и вывод того чего надо


		#await update.message.reply_html(
		#	rf"Hi {message}!"
		#)

	async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
		await update.message.reply_text(
			'Такой команды нет!'
			)

	

	"""Start the bot."""
	# Create the Application and pass it your bot's token.
	application = Application.builder().token(TOKEN).read_timeout(30).write_timeout(30).build()

	# По умолчанию, /start должен быть всегда в боте
	application.add_handler(CommandHandler("start", start))
	# on different commands - answer in Telegram
	application.add_handler(CommandHandler(FRAMES.keys(), master_handler))
	

	# on non command i.e message - echo the message on Telegram
	application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

	# Run the bot until the user presses Ctrl-C
	application.run_polling(allowed_updates=Update.ALL_TYPES)