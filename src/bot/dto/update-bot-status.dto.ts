import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBotStatus {
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;

	@IsNotEmpty()
	@IsInt()
	pid: number;
}
