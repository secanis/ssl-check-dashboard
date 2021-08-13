import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors({ origin: `http://localhost:${PORT}` });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    // await app.init();
    await app.listen(PORT);
    return app.getHttpAdapter().getInstance();
}

export default bootstrap;
