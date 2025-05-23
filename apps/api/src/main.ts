import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {

  const validationPipe = new ValidationPipe({
    transform: true,
  })

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());

  app.useGlobalPipes(validationPipe);

  app.enableCors({ origin: "http://localhost:4200", credentials: true });

  const port = 3001;

  app.setBaseViewsDir(
    join(__dirname, '..', '..', '..', 'apps', 'api', 'templates')
  );

  app.setViewEngine('ejs');

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
