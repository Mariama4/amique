import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_ALREADY_CREATED_ERROR, USER_NOT_FOUND_ERROR } from './user.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	//@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateUserDto) {
		const isUserExisted = await this.userService.findByEmail(dto.login);

		if (isUserExisted != null) {
			throw new BadRequestException(
				USER_ALREADY_CREATED_ERROR.error,
				USER_ALREADY_CREATED_ERROR.message,
			);
		}

		const newUser = await this.userService.create(dto);

		return newUser;
	}

	//@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		const allUsers = await this.userService.findAll();
		return allUsers;
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':email')
	async findByEmail(@Param('email') email: string) {
		const oneUser = await this.userService.findByEmail(email);

		if (oneUser == null) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR.error, USER_NOT_FOUND_ERROR.message);
		}

		return oneUser;
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateUserDto) {
		const isUserExisted = await this.userService.findById(id);

		if (isUserExisted == null) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR.error, USER_NOT_FOUND_ERROR.message);
		}

		return this.userService.updateUserEmailById(id, dto.login);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.userService.deleteById(id);
	}
}
