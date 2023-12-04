import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BotModel } from './models/bot.model';
import { Model } from 'mongoose';
import { CreateBotDto } from './dto/create-bot.dto';
import { FrameModel } from './models/frame.model';
import { CreateFrame } from './dto/create-bot-frame.dto';
import { UpdateBotStatus } from './dto/update-bot-status.dto';
import { spawn } from 'child_process';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotService {
	constructor(
		@InjectModel(BotModel.name) private readonly botModel: Model<BotModel>,
		@InjectModel(FrameModel.name)
		private readonly frameModel: Model<FrameModel>,
	) {}

	async createBot(dto: CreateBotDto) {
		const newBot = new this.botModel(dto);
		return newBot.save();
	}

	async createFrame(botId: string, dto: CreateFrame) {
		const newFrame = new this.frameModel({ botId, ...dto });
		return newFrame.save();
	}

	async findOneBotByNameAndUserId(name: string, userId: string): Promise<BotModel | null> {
		return this.botModel.findOne({ name, userId }).exec();
	}

	async findOneBotById(botId: string): Promise<BotModel> {
		return this.botModel.findOne({ _id: botId }).exec();
	}

	async findAllBots() {
		return this.botModel.find().exec();
	}

	async findOneFrameById(frameId: string) {
		// возврат одного определенного фрейма бота
		return this.frameModel.findOne({ _id: frameId }).exec();
	}

	async findOneFrameByBotIdAndName(botId: string, name: string) {
		return this.frameModel
			.findOne({
				botId,
				name,
			})
			.exec();
	}

	async findAllFramesByBotId(botId: string) {
		return this.frameModel.find({ botId }).exec();
	}

	async updateBot(botId: string, dto: UpdateBotDto) {
		// обновление бота
		return this.botModel.findByIdAndUpdate(botId, dto, { new: true }).exec();
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

	startBot(token: string): number {
		// TODO: обработать возможные ошибки
		const bot = spawn('python3', ['telegram-bot/bot.py', `-t=${token}`]);

		return bot.pid;
	}

	stopBot(pid: number): null {
		// TODO: обработать возможные ошибки
		const result = spawn('kill', [`${pid}`]);

		return null;
	}

	async updateBotFrame(frame_id: string, dto: CreateFrame) {
		// обновление фрейма бота
		return this.frameModel.findByIdAndUpdate(frame_id, dto, { new: true }).exec();
	}

	async deleteBot(botId: string) {
		// удаление бота
		return this.botModel.deleteOne({ _id: botId }).exec();
	}

	async deleteBotFrame(frameId: string) {
		// удаление фрейма бота
		return this.frameModel.deleteOne({ _id: frameId }).exec();
	}
}
