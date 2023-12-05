import {
	Controller,
	Post,
	Body,
	HttpCode,
	BadRequestException,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_CREATED_ERROR } from './auth.constants';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const isUserExists = await this.userService.findOneByEmail(dto.login);

		if (isUserExists != null) {
			throw new BadRequestException(
				USER_ALREADY_CREATED_ERROR.error,
				USER_ALREADY_CREATED_ERROR.message,
			);
		}

		const newUser = await this.userService.create(dto);

		return newUser;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.userService.validateUser(login, password);
		const userAccessTokenObject = await this.authService.login(email);
		return userAccessTokenObject;
	}
}
