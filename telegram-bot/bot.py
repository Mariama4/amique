#!/usr/bin/env python

import logging

from telegram import ForceReply, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

import sys
import argparse

import os

import aiorun

def createParser ():
    parser = argparse.ArgumentParser()
    parser.add_argument ('-t', '--token')

    return parser

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)



def startBot(schema) -> None:


	async def master_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
		message = update.message.text
		await update.message.reply_html(
			rf"Hi {message}!"
		)
	
	async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
		user = update.effective_user
		await update.message.reply_html(
			rf"wtf {user.mention_html()}!",
			reply_markup=ForceReply(selective=True),
		)

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