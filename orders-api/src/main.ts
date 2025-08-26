import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.MICROSERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.MICROSERVICE_PORT ?? '4000', 10),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
 