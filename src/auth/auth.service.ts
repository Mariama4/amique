import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async login(email: string) {
		const accessToken = await this.jwtService.signAsync({ email });
		return { accessToken };
	}
}
