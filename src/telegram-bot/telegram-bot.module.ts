import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramBotModel, TelegramBotSchema } from './models/telegram-bot.model';
import { TelegramBotFrameModel, TelegramBotFrameSchema } from './models/telegram-bot-frame.model';

@Module({
	controllers: [TelegramBotController],
	imports: [
		MongooseModule.forFeature([
			{ name: TelegramBotModel.name, schema: TelegramBotSchema },
			{ name: TelegramBotFrameModel.name, schema: TelegramBotFrameSchema },
		]),
	],
	providers: [TelegramBotService],
})
export class TelegramBotModule {}
