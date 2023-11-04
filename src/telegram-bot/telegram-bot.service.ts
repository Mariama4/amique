import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TelegramBotModel } from './models/telegram-bot.model';
import { Model } from 'mongoose';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';
import { TelegramBotFrameModel } from './models/telegram-bot-frame.model';
import { CreateTelegramBotFrame } from './dto/create-telegram-bot-frame.dto';
import { UpdateTelegramBotStatus } from './dto/update-telegram-bot-status.dto';
import { spawn } from 'child_process';

@Injectable()
export class TelegramBotService {
	constructor(
		@InjectModel(TelegramBotModel.name) private readonly telegramBotModel: Model<TelegramBotModel>,
		@InjectModel(TelegramBotFrameModel.name)
		private readonly telegramBotFrameModel: Model<TelegramBotFrameModel>,
	) {}

	async createBot(dto: CreateTelegramBotDto) {
		const newBot = new this.telegramBotModel({
			name: dto.name,
			token: dto.token,
		});

		const bot = await newBot.save();

		const newFrame = new this.telegramBotFrameModel({
			bot_id: bot._id,
			frame_name: 'start',
			next_frame_name: 'start',
		});

		await newFrame.save();

		return bot;
	}

	async createFrame(bot_id: string, dto: CreateTelegramBotFrame) {
		// создание фрейма
		const newFrame = new this.telegramBotFrameModel({
			bot_id: bot_id,
			...dto,
		});

		return newFrame.save();
	}

	async findOneBotByName(bot_name: string): Promise<TelegramBotModel> {
		return this.telegramBotModel.findOne({ name: bot_name }).exec();
	}

	async findOneBotById(bot_id: string): Promise<TelegramBotModel> {
		return this.telegramBotModel.findOne({ _id: bot_id }).exec();
	}

	async findAllBots() {
		return this.telegramBotModel.find().exec();
	}

	async findOneBotFrame(frame_id: string) {
		// возврат одного определенного фрейма бота
		return this.telegramBotFrameModel.findOne({ _id: frame_id }).exec();
	}

	async findAllBotFrames(bot_id: string) {
		return this.telegramBotFrameModel.find().exec();
	}

	async updateBot(bot_id: string, dto: CreateTelegramBotDto) {
		// обновление бота
		return this.telegramBotModel.findByIdAndUpdate(bot_id, dto, { new: true }).exec();
	}

	async updateBotStatus(bot_id: string, dto: UpdateTelegramBotStatus) {
		// обновление бота
		return this.telegramBotModel
			.findByIdAndUpdate(
				bot_id,
				{
					status: dto.status,
					pid: dto.pid,
				},
				{ new: true },
			)
			.exec();
	}

	async startBot(token: string): Promise<{
		isDone: boolean;
		botStatus: boolean;
		botPID: number;
	}> {
		const bot = spawn('python3', ['bot/bot.py', `-t=${token}`]);

		return {
			isDone: true,
			botStatus: true,
			botPID: bot.pid,
		};
	}

	async stopBot(pid: number): Promise<{
		isDone: boolean;
		botStatus: boolean;
	}> {
		const result = spawn('kill', [`${pid}`]);
		return {
			isDone: true,
			botStatus: true,
		};
	}

	async updateBotFrame(frame_id: string, dto: CreateTelegramBotFrame) {
		// обновление фрейма бота
		return this.telegramBotFrameModel.findByIdAndUpdate(frame_id, dto, { new: true }).exec();
	}

	async deleteBot(bot_id: string) {
		// удаление бота
		return this.telegramBotModel.findByIdAndDelete(bot_id).exec();
	}

	async deleteBotFrame(frame_id: string) {
		// удаление фрейма бота
		return this.telegramBotFrameModel.findByIdAndDelete(frame_id).exec();
	}
}
