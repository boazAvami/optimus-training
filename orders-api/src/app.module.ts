import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { ProductOrder } from './orders/entities/product-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'Ecommerce',
      entities: [Order, ProductOrder],  
      synchronize: true,
      autoLoadEntities: true,
    }),
    OrdersModule,
  ],
})
export class AppModule { }
