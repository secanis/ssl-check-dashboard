import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { User } from '../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(private readonly configService: ConfigService) {}

    private readonly users = [
        {
            userId: crypto
                .createHash('sha1')
                .update(this.configService.get('auth.username'))
                .digest('hex')
                .toString(),
            username: this.configService.get('auth.username'),
            password: bcrypt.hashSync(
                this.configService.get('auth.password'),
                7
            ),
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
