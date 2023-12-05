import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotDto {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	userId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	token: string;
}
