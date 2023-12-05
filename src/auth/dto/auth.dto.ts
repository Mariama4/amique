import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	login: string;

	@IsNotEmpty()
	@IsString()
	@IsStrongPassword()
	password: string;
}
