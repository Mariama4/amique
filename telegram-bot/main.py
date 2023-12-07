import argparse
import sys
import aiorun
import json
from unixsocket import unixSocket as uS
from pathlib import Path
import asyncio
from bot import startBot
import multiprocessing
import os

FILE_PATH = ''
FILE_JSON = ''
BOT_ID = ''

def createParser ():
	parser = argparse.ArgumentParser()
	parser.add_argument ('-f', '--file')

	return parser

if __name__ == "__main__":
	# 1. получение пути до файла из аргумента
	# 2. загрузить данные
	# 3. обработать данные

	parser = createParser()
	namespace = parser.parse_args(sys.argv[1:])
	FILE_PATH = namespace.file
	tempFile = open(FILE_PATH)
	FILE_JSON = json.load(tempFile)
	BOT_ID = Path(FILE_PATH).stem

	#запуск бота в отдельном процессе
	telegram_process = multiprocessing.Process(target=startBot, args=(FILE_JSON['bot']['token'],))
	telegram_process.start()
	
	aiorun.run(uS(BOT_ID))
	#когда unix сокет соединение закрывается, тогда необходимо окончить и процесс бота
	telegram_process.terminate()