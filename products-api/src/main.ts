import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCTS_SERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.PRODUCTS_SERVICE_PORT ?? '4000', 10),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
 