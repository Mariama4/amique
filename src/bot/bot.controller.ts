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
	BOT_ALREADY_CREATED_ERROR,
	BOT_NOT_CREATED_ERROR,
	FRAME_ALREADY_CREATED_ERROR,
	FRAME_NOT_CREATED_ERROR,
	SAME_STATUS_ERROR,
} from './bot.constants';
import { CreateFrame } from './dto/create-bot-frame.dto';
import { UpdateBotStatus } from './dto/update-bot-status.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bot')
export class BotController {
	constructor(private readonly botService: BotService) {}
	//	 TODO: убрать повторение кода
	//@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBot(@Body() dto: CreateBotDto) {
		//	Поиск бота по name и userId.
		//	У разных пользователей могут быть боты с одинаковыми
		//	именами, но у одного пользователя не должно быть два бота с одинаковым именем!
		const isBotExists = await this.botService.findOneBotByNameAndUserId(dto.name, dto.userId);

		if (isBotExists != null) {
			throw new BadRequestException(
				BOT_ALREADY_CREATED_ERROR.error,
				BOT_ALREADY_CREATED_ERROR.message,
			);
		}

		const newBot = await this.botService.createBot(dto);
		return newBot;
	}

	//@UseGuards(JwtAuthGuard)
	@Post(':bot_id/frame')
	async createFrame(@Param('bot_id', IdValidationPipe) botId: string, @Body() dto: CreateFrame) {
		//	Проверяется есть ли такой бот с botId.
		//	Если бот с таким botId существует, тогда
		//	проверяется есть ли фрейм с таким botId и name

		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const isFrameExists = await this.botService.findOneFrameByBotIdAndName(botId, dto.name);

		if (isFrameExists != null) {
			throw new BadRequestException(
				FRAME_ALREADY_CREATED_ERROR.error,
				FRAME_ALREADY_CREATED_ERROR.message,
			);
		}

		const newFrame = await this.botService.createFrame(botId, dto);

		return newFrame;
	}

	//@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAllBots() {
		//	Возвращает всех ботов, которые есть в базе
		const allBots = await this.botService.findAllBots();
		return allBots;
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id')
	async findOneBot(@Param('bot_id', IdValidationPipe) botId: string) {
		const oneBot = await this.botService.findOneBotById(botId);

		if (oneBot == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		return oneBot;
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame')
	async findAllBotFrames(@Param('bot_id', IdValidationPipe) botId: string) {
		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const allBotFrames = await this.botService.findAllFramesByBotId(botId);
		return allBotFrames;
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':bot_id/frame/:frame_id')
	async findOneBotFrame(
		@Param('bot_id', IdValidationPipe) botId: string,
		@Param('frame_id', IdValidationPipe) frameId: string,
	) {
		//проверка что бот есть
		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const oneFrame = await this.botService.findOneFrameById(frameId);
		return oneFrame;
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id')
	async patchBot(@Param('bot_id', IdValidationPipe) botId: string, @Body() dto: UpdateBotDto) {
		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const patchedBot = await this.botService.updateBot(botId, dto);

		return patchedBot;
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id/status')
	async switchBotStatus(
		@Param('bot_id', IdValidationPipe) botId: string,
		@Body() dto: UpdateBotStatus,
	) {
		//	Проверить есть ли такой бот.
		//	...
		//	сначала запускаем/выключаем бота, после этого записываем в бд
		//	потому что вдруг произойдет ошибка, а в бд бот запущен/выключен
		//	...
		// Обновить статус бота.

		const oneBot = await this.botService.findOneBotById(botId);

		if (oneBot == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		if (oneBot.status == dto.status) {
			throw new BadRequestException(SAME_STATUS_ERROR);
		}

		let botPID: number | null;

		if (dto.status) {
			botPID = this.botService.startBot(oneBot.token);
		} else {
			botPID = this.botService.stopBot(dto.pid);
		}

		const patchedBot = await this.botService.updateBotStatus(oneBot.id, {
			status: dto.status,
			pid: botPID,
		});

		return patchedBot;
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':bot_id/frame/:frame_id')
	async patchFrame(
		@Param('bot_id', IdValidationPipe) botId: string,
		@Param('frame_id', IdValidationPipe) frameId: string,
		@Body() dto: CreateFrame,
	) {
		// Проверка что бот есть
		// Проверка что фрейм у бота есть
		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const isFrameExists = await this.botService.findOneFrameById(frameId);

		if (isFrameExists == null) {
			throw new BadRequestException(FRAME_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		const patchedFrame = await this.botService.updateBotFrame(frameId, dto);

		return patchedFrame;
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id')
	async deleteBot(@Param('bot_id', IdValidationPipe) botId: string) {
		const isBotExists = await this.botService.findOneBotById(botId);

		if (isBotExists == null) {
			throw new BadRequestException(BOT_NOT_CREATED_ERROR.error, BOT_NOT_CREATED_ERROR.message);
		}

		return this.botService.deleteBot(isBotExists.id);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':bot_id/frame/:frame_id')
	async deleteFrame(
		@Param('bot_id', IdValidationPipe) botId: string,
		@Param('frame_id', IdValidationPipe) frameId: string,
	) {
		// проверка что такой бот есть
		const isFrameExists = await this.botService.findOneFrameById(botId);

		if (isFrameExists == null) {
			throw new BadRequestException(FRAME_NOT_CREATED_ERROR.error, FRAME_NOT_CREATED_ERROR.message);
		}

		return this.botService.deleteBot(isFrameExists.id);
	}
}
