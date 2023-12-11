import argparse
import sys
from telegram import ReplyKeyboardMarkup, InputMediaPhoto

def getNamespace():
	def createParser():
		parser = argparse.ArgumentParser()
		parser.add_argument ('-f', '--file')

		return parser
	parser = createParser()
	namespace = parser.parse_args(sys.argv[1:])
	return namespace


def getNextFrame(FRAMES, previousFrame, userText):
	for index, value in enumerate(previousFrame['markup']):
		if value['text'] == userText:
			return value['nextFrameName']
	# Если ничего не найдено, то возвращаем текущий фрейм
	return previousFrame


# TODO: добавить возможность работы с другим типом кнопок (inline)
def markupBuilder(buttons):

	reply_keyboard = [[button['text'] for button in buttons]]

	return ReplyKeyboardMarkup(
		reply_keyboard, 
		one_time_keyboard=True, 
		resize_keyboard=True
		#input_field_placeholder="Boy or Girl?"
	)


# FIXME: вообще работать не должно, надо исправить
def mediaGroupBuilder(media, caption):
	mediaGroup = []
	for index, value in enumerate(media):
		mediaGroup.append(
			InputMediaPhoto(media=value,caption=caption if index == 0 else ''))

	return mediaGroup

# TODO: изучить, возможно, есть способ без внешнего сервиса
def getHost():
	import urllib

	response = urllib.request.urlopen("https://api.ipify.org")
	ip = response.read().decode("utf-8")

	return ip