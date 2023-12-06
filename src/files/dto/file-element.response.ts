import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class FileElementResponse {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	url: string;

	@IsNotEmpty()
	@IsString()
	name: string;
}
