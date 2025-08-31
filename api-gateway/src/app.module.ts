import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';
import { OrdersController } from './orders/orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ordersServiceName, productsServiceName } from './tokens';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: productsServiceName,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: parseInt(process.env.PRODUCTS_SERVICE_PORT ?? '4000', 10),
        },
      },
      {
        name: ordersServiceName,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: parseInt(process.env.ORDERS_SERVICE_PORT ?? '5000', 10),
        },
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, OrdersController],
})
export class AppModule {}
