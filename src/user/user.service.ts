import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDocument, UserModel } from './models/user.model';
import { Model, Types } from 'mongoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findOneByEmail(email);

		if (user == null) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		// TODO: что compare возвращает если пароль некорректен?
		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { email: user.email };
	}

	async create(dto: { login: string; password: string }) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});
		return newUser.save();
	}

	async findManyByEmail(email: string) {
		return this.userModel.find({ email }).exec();
	}

	async findOneByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findById(id: string) {
		return this.userModel.findById(id).exec();
	}

	async findAll() {
		return this.userModel.find().exec();
	}

	async deleteById(id: string | Types.ObjectId) {
		return this.userModel.deleteOne({ _id: id }).exec();
	}

	async updateUserEmailById(id: string | Types.ObjectId, email: string) {
		return this.userModel.updateOne({ _id: id }, { email }).exec();
	}
}
