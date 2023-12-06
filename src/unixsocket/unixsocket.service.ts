import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'net';
import { path } from 'app-root-path';
import { SendEventDto } from './dto/send-event.dto';
import { BotService } from 'src/bot/bot.service';
import { spawn } from 'node:child_process';

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
		const isDeleted = this.clients.delete(botId);

		return { botId, isDeleted };
	}

	private createServer(): Server {
		const server = new Server();

		server.on('connection', (socket: Socket) => {
			socket.on('connect', () => {
				console.log('connect ' + this.clients.size);
			});

			socket.once('data', (data) => {
				//const message = data.toString();
				//console.log(`Bot message: ${message}`);
				const botId = data.toString();
				this.clients.set(botId, socket);

				console.log(`Bot #${botId} connected`);

				// TODO: отправление боту его схемы данных
				//const botFrames = this.botService.findAllFramesByBotId(botId);
				//const message = JSON.stringify(botFrames);
				const message = JSON.stringify({
					a: 'f',
					b: 'h',
				});
				socket.write(`${message}\n\r`);
				console.log(`Bot #${botId} send frames`);
				//socket.write('SHUTDOWN');
				//console.log(`Bot #${botId} send SHUTDOWN`);
				//console.log(this.clients.size);
			});

			socket.on('close', (hadError) => {
				const result = this.deleteClientBySocket(socket);
				console.log(`Bot #${result.botId} deleted from clients`);
				console.log('hadError ' + hadError);
				//console.log(this.clients.size);
			});

			socket.on('error', (error) => {
				// TODO: перепроверить (вообще все перепроверить)
				const result = this.deleteClientBySocket(socket);
				console.log(`Bot #${result.botId} deleted from clients`);
				console.log('error ' + error);
				//console.log(this.clients.size);
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
