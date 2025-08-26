import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderModel, UpdateProductInOrderDto } from '@repo/shared';
import { CreateOrderDto } from '@repo/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderProductDto } from '@repo/shared/src/dtos/order-product.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'findAllOrders' })
  getAllOrders(): Promise<OrderModel[]> {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'findOrderById' })
  getOrderById(@Payload() id: number): Promise<OrderModel> {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: 'createOrder' })
  createOrder(@Payload() dto: CreateOrderDto): Promise<OrderModel> {
    return this.ordersService.create(dto);
  }

  @MessagePattern({ cmd: 'updateOrderProductAmount' })
  updateProductAmount(
    @Payload() dto: UpdateProductInOrderDto,
  ): Promise<OrderModel> {
    return this.ordersService.updateAmount(dto.orderId, dto.productId, dto.amount);
  }

  @MessagePattern({ cmd: 'deleteOrder' })
  async deleteOrder(@Payload() id: number): Promise<{ deleted: boolean }> {
    return this.ordersService.remove(id);
  }
}
