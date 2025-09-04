import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with credentials
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Parse cookies
  app.use(cookieParser());
  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.info(
    '\x1b[47m\x1b[46m%s\x1b[0m',
    `🧠 Server running on 👀  `,
    '\x1b[1m\x1b[5m',
    `http://localhost:${port} ‍🔥🚀`,
  );
  console.log(`CORS enabled for: ${process.env.FRONTEND_URL}`);
}

bootstrap();
