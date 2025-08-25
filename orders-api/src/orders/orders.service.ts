import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Order } from './entities/order.entity';
import { ProductOrder } from './entities/product-order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderModel, ProductInOrderModel, ProductModel } from '@repo/shared';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(ProductOrder) 
    private readonly productOrdersRepo: Repository<ProductOrder>,
    @Inject('PRODUCTS_SERVICE') 
    private readonly productsClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.productsClient.connect();
  }

  async create(dto: CreateOrderDto): Promise<OrderModel> {
    const productIds = dto.products.map((p) => p.productId);

    const exist = await lastValueFrom(
      this.productsClient.send<boolean>({ cmd: 'doProductsExist' }, {ids: productIds}),
    );
    if (!exist) {
      throw new BadRequestException('One or more products do not exist');
    }

    const order = this.ordersRepo.create();
    order.products = dto.products.map((p) =>
      this.productOrdersRepo.create({ productId: p.productId, amount: p.amount }),
    );

    const savedOrder = await this.ordersRepo.save(order);
    return this.mapToOrderModel(savedOrder);
  }

  async findOne(id: number): Promise<OrderModel> {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
 
    const productIds = order.products.map((p) => p.productId);
    const productDetails = await lastValueFrom(
      this.productsClient.send<ProductModel[]>({ cmd: 'findProductsByIds' }, productIds),
    );

    return plainToInstance(OrderModel, {
      id: order.id,
      date: order.date,
      products: order.products.map((p) => {
        const product = productDetails.find((d) => d.id === p.productId);
        return {
          productId: p.productId,
          amount: p.amount,
          product,
        };
      }),
    });
  }

  private mapToOrderModel(order: Order): OrderModel {
    return plainToInstance(OrderModel, {
      id: order.id,
      date: order.date,
      products: order.products.map((p) =>
        plainToInstance(ProductInOrderModel, {
          productId: p.productId,
          amount: p.amount,
        }),
      ),
    });
  }

  async findAll(): Promise<OrderModel[]> {
    const orders = await this.ordersRepo.find({ relations: ['products'] });
    return orders.map(this.mapToOrderModel);
  }

 

  async updateAmount(orderId: number, productId: number, amount: number): Promise<OrderModel> {
    const productOrder = await this.productOrdersRepo.findOne({
      where: { order: { id: orderId }, productId },
      relations: ['order'],
    });
    if (!productOrder) {
      throw new NotFoundException(`Product ${productId} not found in order ${orderId}`);
    }
    productOrder.amount = amount;
    await this.productOrdersRepo.save(productOrder);
    return this.findOne(orderId);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.ordersRepo.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}
