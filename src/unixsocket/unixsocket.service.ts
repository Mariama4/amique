import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'net';
import { path } from 'app-root-path';
import { SendEventDto } from './dto/send-event.dto';

@Injectable()
export class UnixsocketService implements OnModuleInit {
	private readonly socketPath = `${path}/temp/bots.sock`;
	private server: Server;
	private clients: Map<string, Socket> = new Map();

	onApplicationShutdown(signal: string) {
		this.server.close();
	}

	onModuleInit() {
		this.server = this.createServer();
	}

	private createServer(): Server {
		const server = new Server();

		server.on('connection', (socket: Socket) => {
			socket.on('data', (data) => {
				const botId = data.toString();
				this.clients.set(botId, socket);
				console.log(`Bot #${botId} connected`);
				// TODO: отправление боту его схемы данных
			});
		});

		server.listen(this.socketPath, () => {
			console.log(`Server listening on socket: ${this.socketPath}`);
		});

		return server;
	}

	public sendEvent({ botId, event }: SendEventDto): void {
		const message = JSON.stringify(event);
		const bot = this.clients.get(botId);
		bot.write(message);
	}
}
