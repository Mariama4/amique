import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBotDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	token: string;
}
