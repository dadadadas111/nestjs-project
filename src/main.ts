import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import admin from 'firebase-admin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const credentials = require('../serviceAccountKey.json')
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  })


  await app.listen(3000);
}
bootstrap();
