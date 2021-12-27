import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    app.useLogger(config.get('logger'));
    app.enableCors({ origin: '*' });
    app.setGlobalPrefix('/api');

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
export default bootstrap;
