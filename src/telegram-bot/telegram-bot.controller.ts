import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { TelegramBotService } from './telegram-bot.service';
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';
import {
	ALREADY_REGISTERED_ERROR,
	SAME_STATUS_ERROR,
	UNEXPECTED_CREATE_BOT_ERROR,
} from './telegram-bot.constants';
import { CreateTelegramBotFrame } from './dto/create-telegram-bot-frame.dto';
import { UpdateTelegramBotStatus } from './dto/update-telegram-bot-status.dto';

@Controller('telegram-bot')
export class TelegramBotController {
	constructor(private readonly telegramBotService: TelegramBotService) {}

	//@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBot(@Body() dto: CreateTelegramBotDto) {
		const oldBot = await this.telegramBotService.findOneBotByName(dto.name);
		if (oldBot) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}

		return this.telegramBotService.createBot(dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Post(':bot_id/frame')
	async createFrame(@Param('bot_id') bot_id: string, @Body() dto: CreateTelegramBotFrame) {
		// проверка есть ли бот с таким айди и только после этого создание фрейма
		// проверка есть ли такой фрейм с таким именем
		return this.telegramBotService.createFrame(bot_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Get('')
	async findAllBots() {
		return this.telegramBotService.findAllBots();
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id')
	async findOneBot(@Param('bot_id') bot_id: string) {
		return this.telegramBotService.findOneBotById(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame')
	async findAllBotFrames(@Param('bot_id') bot_id: string) {
		return this.telegramBotService.findAllBotFrames(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame/:frame_id')
	async findOneBotFrame(@Param('bot_id') bot_id: string, @Param('frame_id') frame_id: string) {
		//проверка что бот есть
		return this.telegramBotService.findOneBotFrame(frame_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id')
	async patchBot(@Param('bot_id') bot_id: string, @Body() dto: CreateTelegramBotDto) {
		return this.telegramBotService.updateBot(bot_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id/status')
	async switchBotStatus(@Param('bot_id') bot_id: string, @Body() dto: UpdateTelegramBotStatus) {
		const bot = await this.telegramBotService.findOneBotById(bot_id);

		if (bot?.status === dto.status) {
			// вернуть сообщение, что текущий статус и так равен переданному
			throw new BadRequestException(SAME_STATUS_ERROR);
		}

		// сначала запускаем/выключаем бота, после этого записываем в бд
		// потому что вдруг произойдет ошибка, а в бд бот запущен/выключен

		const result: {
			isDone: boolean;
			botStatus: boolean;
			botPID?: number;
		} = dto.status
			? await this.telegramBotService.startBot(bot.token)
			: await this.telegramBotService.stopBot(bot.pid);

		if (result.isDone) {
			return this.telegramBotService.updateBotStatus(bot_id, {
				status: result.botStatus,
				pid: result.botPID,
			});
		} else {
			throw new BadRequestException(UNEXPECTED_CREATE_BOT_ERROR);
		}
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id/frame/:frame_id')
	async patchFrame(
		@Param('bot_id') bot_id: string,
		@Param('frame_id') frame_id: string,
		@Body() dto: CreateTelegramBotFrame,
	) {
		// проверка что бот есть
		return this.telegramBotService.updateBotFrame(frame_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id')
	async deleteBot(@Param('bot_id') bot_id: string) {
		return this.telegramBotService.deleteBot(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id/frame/:frame_id')
	async deleteFrame(@Param('bot_id') bot_id: string, @Param('frame_id') frame_id: string) {
		// проверка что такой бот есть
		return this.telegramBotService.deleteBotFrame(frame_id);
	}
}
