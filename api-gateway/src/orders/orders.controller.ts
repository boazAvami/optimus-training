import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { OrderModel, UpdateProductInOrderDto } from '@repo/shared';
import { CreateOrderDto     } from '@repo/shared';
import { OrderProductDto } from '@repo/shared';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders with products and categories' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [OrderModel] })
  async getAllOrders() {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single order by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderModel })
  async getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersClient.send({ cmd: 'findOrderById' }, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created', type: OrderModel })
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'createOrder' }, dto);
  }

  @Patch(':orderId/product')
  @ApiOperation({ summary: 'Update amount of a product in an order' })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiBody({ type: OrderProductDto })
  @ApiResponse({ status: 200, description: 'Updated order', type: OrderModel })
  async updateProductAmount(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: OrderProductDto,
  ) {
    return this.ordersClient.send(
      { cmd: 'updateOrderProductAmount' },
      { ...dto, orderId },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Order deleted',
    schema: { example: { deleted: true } },
  })
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersClient.send({ cmd: 'deleteOrder' }, id);
  }
}
