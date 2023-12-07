import { Module, forwardRef } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModel, BotSchema } from './models/bot.model';
import { FrameModel, FrameSchema } from './models/frame.model';
import { UnixsocketModule } from 'src/unixsocket/unixsocket.module';
import { FilesModule } from 'src/files/files.module';

@Module({
	controllers: [BotController],
	imports: [
		MongooseModule.forFeature([
			{ name: BotModel.name, schema: BotSchema },
			{ name: FrameModel.name, schema: FrameSchema },
		]),
		forwardRef(() => UnixsocketModule),
		FilesModule,
	],
	exports: [BotService],
	providers: [BotService],
})
export class BotModule {}
