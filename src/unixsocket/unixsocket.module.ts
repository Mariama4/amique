import { Module, forwardRef } from '@nestjs/common';
import { UnixsocketService } from './unixsocket.service';
import { BotModule } from 'src/bot/bot.module';

@Module({
	providers: [UnixsocketService],
	imports: [forwardRef(() => BotModule)],
	exports: [UnixsocketService],
})
export class UnixsocketModule {}
