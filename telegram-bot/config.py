BOT = schema['bot']
FRAMES = dict()

for frame in schema['frames']:
	FRAMES.update({frame['name']: frame})

TOKEN = BOT['token']