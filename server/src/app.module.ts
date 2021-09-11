import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './environment/environment';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DataModule } from './data/data.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        Logger,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'public'),
        }),
        DataModule,
    ],
    controllers: [AppController, DashboardController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
