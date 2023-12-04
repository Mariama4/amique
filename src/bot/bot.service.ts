import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BotModel } from './models/bot.model';
import { Model } from 'mongoose';
import { CreateBotDto } from './dto/create-bot.dto';
import { FrameModel } from './models/frame.model';
import { CreateFrame } from './dto/create-bot-frame.dto';
import { UpdateBotStatus } from './dto/update-bot-status.dto';
import { spawn } from 'child_process';

@Injectable()
export class BotService {
	constructor(
		@InjectModel(BotModel.name) private readonly botModel: Model<BotModel>,
		@InjectModel(FrameModel.name)
		private readonly frameModel: Model<FrameModel>,
	) {}

	async createBot(dto: CreateBotDto) {
		const newBot = new this.botModel({
			name: dto.name,
			token: dto.token,
		});

		const bot = await newBot.save();

		const newFrame = new this.frameModel({
			bot_id: bot._id,
			frame_name: 'start',
			next_frame_name: 'start',
		});

		await newFrame.save();

		return bot;
	}

	async createFrame(bot_id: string, dto: CreateFrame) {
		// создание фрейма
		const newFrame = new this.frameModel({
			bot_id: bot_id,
			...dto,
		});

		return newFrame.save();
	}

	async findOneBotByName(bot_name: string): Promise<BotModel> {
		return this.botModel.findOne({ name: bot_name }).exec();
	}

	async findOneBotById(bot_id: string): Promise<BotModel> {
		return this.botModel.findOne({ _id: bot_id }).exec();
	}

	async findAllBots() {
		return this.botModel.find().exec();
	}

	async findOneBotFrame(frame_id: string) {
		// возврат одного определенного фрейма бота
		return this.frameModel.findOne({ _id: frame_id }).exec();
	}

	async findAllBotFrames(bot_id: string) {
		return this.frameModel.find().exec();
	}

	async updateBot(bot_id: string, dto: CreateBotDto) {
		// обновление бота
		return this.botModel.findByIdAndUpdate(bot_id, dto, { new: true }).exec();
	}

	async updateBotStatus(bot_id: string, dto: UpdateBotStatus) {
		// обновление бота
		return this.botModel
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
		const bot = spawn('python3', ['telegram-bot/bot.py', `-t=${token}`]);

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

	async updateBotFrame(frame_id: string, dto: CreateFrame) {
		// обновление фрейма бота
		return this.frameModel.findByIdAndUpdate(frame_id, dto, { new: true }).exec();
	}

	async deleteBot(bot_id: string) {
		// удаление бота
		return this.botModel.findByIdAndDelete(bot_id).exec();
	}

	async deleteBotFrame(frame_id: string) {
		// удаление фрейма бота
		return this.frameModel.findByIdAndDelete(frame_id).exec();
	}
}
