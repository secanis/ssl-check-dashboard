import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { DataController } from './data.controller';
import { DataGateway } from './data.gateway';
import { DataService } from './data.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [ConfigModule, InMemoryDBModule.forRoot({}), AuthModule],
    providers: [DataService, DataGateway],
    controllers: [DataController],
})
export class DataModule {}
