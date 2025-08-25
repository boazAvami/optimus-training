import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger for HTTP endpoints
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Products and Categories API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Connect microservice before starting HTTP server
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCTS_SERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.PRODUCTS_SERVICE_PORT ?? '4000', 10),
    },
  });

  // Start microservices
  await app.startAllMicroservices();
  console.log(`Products microservice running on TCP ${process.env.PRODUCTS_SERVICE_HOST || '127.0.0.1'}:${process.env.PRODUCTS_SERVICE_PORT ?? 4000}`);

  // Start HTTP server
  await app.listen(process.env.PORT ?? 3000);
  console.log(`HTTP server running on port ${process.env.PORT ?? 3000}`);
}

bootstrap();
