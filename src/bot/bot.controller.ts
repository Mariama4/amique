import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { BotService } from './bot.service';
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
import { CreateBotDto } from './dto/create-bot.dto';
import {
	ALREADY_REGISTERED_ERROR,
	SAME_STATUS_ERROR,
	UNEXPECTED_CREATE_BOT_ERROR,
} from './bot.constants';
import { CreateFrame } from './dto/create-bot-frame.dto';
import { UpdateBotStatus } from './dto/update-bot-status.dto';

@Controller('bot')
export class BotController {
	constructor(private readonly botService: BotService) {}

	//@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBot(@Body() dto: CreateBotDto) {
		const oldBot = await this.botService.findOneBotByName(dto.name);
		if (oldBot) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}

		return this.botService.createBot(dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Post(':bot_id/frame')
	async createFrame(@Param('bot_id') bot_id: string, @Body() dto: CreateFrame) {
		// проверка есть ли бот с таким айди и только после этого создание фрейма
		// проверка есть ли такой фрейм с таким именем
		return this.botService.createFrame(bot_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Get('')
	async findAllBots() {
		return this.botService.findAllBots();
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id')
	async findOneBot(@Param('bot_id') bot_id: string) {
		return this.botService.findOneBotById(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame')
	async findAllBotFrames(@Param('bot_id') bot_id: string) {
		return this.botService.findAllBotFrames(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame/:frame_id')
	async findOneBotFrame(@Param('bot_id') bot_id: string, @Param('frame_id') frame_id: string) {
		//проверка что бот есть
		return this.botService.findOneBotFrame(frame_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id')
	async patchBot(@Param('bot_id') bot_id: string, @Body() dto: CreateBotDto) {
		return this.botService.updateBot(bot_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id/status')
	async switchBotStatus(@Param('bot_id') bot_id: string, @Body() dto: UpdateBotStatus) {
		const bot = await this.botService.findOneBotById(bot_id);

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
			? await this.botService.startBot(bot.token)
			: await this.botService.stopBot(bot.pid);

		if (result.isDone) {
			return this.botService.updateBotStatus(bot_id, {
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
		@Body() dto: CreateFrame,
	) {
		// проверка что бот есть
		return this.botService.updateBotFrame(frame_id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id')
	async deleteBot(@Param('bot_id') bot_id: string) {
		return this.botService.deleteBot(bot_id);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id/frame/:frame_id')
	async deleteFrame(@Param('bot_id') bot_id: string, @Param('frame_id') frame_id: string) {
		// проверка что такой бот есть
		return this.botService.deleteBotFrame(frame_id);
	}
}
