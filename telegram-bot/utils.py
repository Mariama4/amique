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


