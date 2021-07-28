import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { DataController } from './data.controller';
import { DataGateway } from './data.gateway';
import { DataService } from './data.service';

@Module({
    imports: [ConfigModule, InMemoryDBModule.forRoot({})],
    providers: [DataService, DataGateway],
    controllers: [DataController],
})
export class DataModule {}
