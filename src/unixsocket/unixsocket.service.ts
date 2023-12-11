import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'net';
import { path } from 'app-root-path';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class UnixsocketService implements OnModuleInit {
	private readonly socketPath = `${path}/temp/bots.sock`;
	private server: Server;
	private clients: Map<string, Socket> = new Map();

	constructor(@Inject(forwardRef(() => BotService)) private readonly botService: BotService) {}

	onApplicationShutdown(signal: string) {
		this.server.close();
	}

	onModuleInit() {
		this.server = this.createServer();
	}

	private deleteClientBySocket(socket: Socket) {
		const botId = [...this.clients.entries()].filter(({ 1: v }) => v === socket).map(([k]) => k)[0];
		this.clients.delete(botId);
		console.log(`Bot #${botId} deleted from clients`);
	}

	private createServer(): Server {
		const server = new Server();

		server.on('connection', (socket: Socket) => {
			socket.on('connect', () => {
				console.log('Someone connected!');
			});

			socket.on('data', (data) => {
				const botId = data.toString();
				this.clients.set(botId, socket);
				console.log(`Bot #${botId} connected`);
			});

			socket.on('close', (hadError) => {
				this.deleteClientBySocket(socket);
				//console.log('hadError ' + hadError);
			});

			socket.on('error', (error) => {
				// TODO: перепроверить (вообще все перепроверить)
				this.deleteClientBySocket(socket);
				//console.log('error ' + error);
			});
		});

		server.listen(this.socketPath, () => {
			console.log(`Server listening on socket: ${this.socketPath}`);
		});

		return server;
	}

	public sendEvent(botId: string, event: string): void {
		const message = JSON.stringify(event);
		console.log(this.clients.size);
		const bot = this.clients.get(botId);
		if (bot != undefined) {
			bot.write(message);
			console.log(`Send event to Bot #${botId}: ${event}`);
		} else {
			throw new Error('bot undefined');
		}
	}
}
