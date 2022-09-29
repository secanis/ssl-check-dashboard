import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import configuration from './environment/environment';

import { AppController } from './app.controller';
import { HealthController } from './controllers/health/health.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'public'),
        }),
        DataModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
