
import aiorun
import json
from unixsocket import unixSocket as uS
from pathlib import Path
import asyncio
from bot import startBot
import multiprocessing
import os
from utils import getNamespace

if __name__ == "__main__":
	# 1. получение пути до файла из аргумента
	# 2. загрузить данные
	# 3. обработать данные
	# 4. запуск бота
	
	NAMESPACE = getNamespace()
	FILE_PATH = NAMESPACE.file
	FILE_JSON = json.load(open(FILE_PATH))
	BOT_ID = Path(FILE_PATH).stem

	#запуск бота в отдельном процессе
	telegram_process = multiprocessing.Process(target=startBot, args=(FILE_JSON,))
	telegram_process.start()
	
	aiorun.run(uS(BOT_ID))
	#когда unix сокет соединение закрывается, тогда необходимо закрыть и процесс бота
	telegram_process.terminate()