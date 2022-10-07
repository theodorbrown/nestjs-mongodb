import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //each time u find a match transform it !
    transform: true,
    //removes props not expected in payload !
    whitelist: true,
    //throw new exception to client and doesn't complete the operation !
    forbidNonWhitelisted: true
  }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
