import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module.js";
import { fastifyCookie } from "@fastify/cookie";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // cookies
  const expiresDate = new Date(Date.now());
  expiresDate.setDate(expiresDate.getDate() + 1);

  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      expires: expiresDate,
      maxAge: 60 * 60 * 24,
      path: "/",
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Configurações para as validações de dados funcionarem
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
