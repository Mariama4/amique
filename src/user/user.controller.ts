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
import { ALREADY_REGISTERED_ERROR } from './user.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	//@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateUserDto) {
		const oldUser = await this.userService.findByEmail(dto.login);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.userService.create(dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		return this.userService.findAll();
	}

	//@UseGuards(JwtAuthGuard)
	@Get(':email')
	async findByEmail(@Param('email') email: string) {
		return this.userService.findByEmail(email);
	}

	//@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateUserDto) {
		return this.userService.updateById(id, dto);
	}

	//@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.userService.deleteById(id);
	}
}
