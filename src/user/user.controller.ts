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

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateUserDto) {
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

	@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAllUsers() {
		const allUsers = await this.userService.findAll();
		return allUsers;
	}

	@UseGuards(JwtAuthGuard)
	@Get(':email')
	async findByEmail(@Param('email') email: string) {
		const isUserExists = await this.userService.findOneByEmail(email);

		if (isUserExists == null) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR.error, USER_NOT_FOUND_ERROR.message);
		}

		return isUserExists;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateUserDto) {
		const isUserExists = await this.userService.findById(id);

		if (isUserExists == null) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR.error, USER_NOT_FOUND_ERROR.message);
		}

		const patchedUser = await this.userService.updateUserEmailById(isUserExists.id, dto.login);

		return patchedUser;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const isUserExists = await this.userService.findById(id);

		if (isUserExists == null) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR.error, USER_NOT_FOUND_ERROR.message);
		}

		const deletedUser = await this.userService.deleteById(isUserExists.id);

		return deletedUser;
	}

	//TODO: добавить полнотекстовый поиск пример: https://www.mongodb.com/basics/full-text-search#:~:text=launch%20the%20process.-,Once,-the%20index%20is
}
