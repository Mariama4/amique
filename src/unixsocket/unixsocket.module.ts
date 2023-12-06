import { Module } from '@nestjs/common';
import { UnixsocketService } from './unixsocket.service';

@Module({
	providers: [UnixsocketService],
	exports: [UnixsocketService],
})
export class UnixsocketModule {}
