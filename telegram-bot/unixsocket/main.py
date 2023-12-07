import asyncio
import os

class BotClient(asyncio.Protocol):
	def connection_made(self, transport):
		self.transport = transport
		self.reader = asyncio.StreamReader()
		self.transport.set_protocol(self)
	
	def data_received(self, data):
		self.reader.feed_data(data)

	def connection_lost(self, exc):
		print('conn lost!')
		# FIXME:  wtf why infinity reading???
		#self.reader.feed_eof()

		self.transport.close()
		asyncio.get_event_loop().stop()

	async def read_data(self):
		while True:
			message = (await self.reader.read(1024)).decode('utf8')
			#TODO: сделать нормальную проверку, эта не подходит!
			if 'SHUTDOWN' in message:
				break
			print(f'Bot #{namespace.id} Received request: {message}')

async def unixSocket(id):
	# Создание соединения с Unix-сокетом
	# TODO: поставь более оптимальный путь
	socket_path = 'temp/bots.sock'
	loop = asyncio.get_event_loop()
	transport, protocol = await loop.create_unix_connection(
		lambda: BotClient(), 
		path=socket_path
	)

	# Отправка сообщения
	message = f'{id}'
	transport.write(message.encode())

	try:
		await protocol.read_data()
	except asyncio.CancelledError:
		pass	
	finally:
		transport.close()