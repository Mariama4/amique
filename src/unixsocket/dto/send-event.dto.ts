import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { EVENT_TYPE } from '../unixsocket.constants';

export class SendEventDto {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	botId: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(EVENT_TYPE)
	event: string;
}
