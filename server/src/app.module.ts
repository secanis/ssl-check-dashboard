import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import configuration from './environment/environment';

import { AppController } from './app.controller';
import { HealthController } from './controllers/health/health.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';

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
    controllers: [AppController, HealthController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
