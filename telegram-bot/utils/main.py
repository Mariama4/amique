import argparse
import sys

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