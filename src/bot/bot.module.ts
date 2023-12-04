import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModel, BotSchema } from './models/bot.model';
import { FrameModel, FrameSchema } from './models/frame.model';

@Module({
	controllers: [BotController],
	imports: [
		MongooseModule.forFeature([
			{ name: BotModel.name, schema: BotSchema },
			{ name: FrameModel.name, schema: FrameSchema },
		]),
	],
	providers: [BotService],
})
export class BotModule {}
