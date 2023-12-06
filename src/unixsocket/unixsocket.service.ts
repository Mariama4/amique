import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'net';
import { path } from 'app-root-path';

@Injectable()
export class UnixsocketService implements OnModuleInit {
	private readonly socketPath = `${path}/temp/bots.sock`;
	private server: Server;
	private clients: Map<string, Socket> = new Map();

	onApplicationShutdown(signal: string) {
		this.server.close(); // e.g. "SIGINT"
	}

	onModuleInit() {
		this.server = this.createServer();
	}

	private createServer() {
		const server = new Server();

		server.on('connection', (socket: Socket) => {
			socket.on('data', (data) => {
				const message = data.toString();
				this.clients.set('1', socket);
				console.log(message);
			});
		});

		server.listen(this.socketPath, () => {
			console.log(`Server listening on socket: ${this.socketPath}`);
		});

		return server;
	}

	public getServer(botId: string) {
		//const isServerExists = this.servers[botId];
		//if (!isServerExists) {
		//	// throw error
		//}
		//return isServerExists;
	}

	public sendEvent(botId: string, eventData: string) {
		//const botId = '1';
		//const eventData = `hello from server to bot #${botId}`;

		const message = JSON.stringify(eventData);
		const bot = this.clients.get(botId);
		bot.write(message);
	}
}
