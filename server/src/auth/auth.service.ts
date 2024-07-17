import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        } else {
            this.logger.warn('Login failed');
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    verify(authToken: string): boolean {
        try {
            if (authToken) {
                return !!this.jwtService.verify(
                    authToken.replace('Baerer ', ''),
                );
            }
        } catch (e) {
            this.logger.error(e);
        }
        return false;
    }
}
