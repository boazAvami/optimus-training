import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderModel } from '@repo/shared';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderProductAmountDto } from './dto/update-order-product-amount.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders with products and categories' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [OrderModel] })
  getAllOrders(): Promise<OrderModel[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single order by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderModel })
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<OrderModel> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created', type: OrderModel })
  createOrder(@Body() dto: CreateOrderDto): Promise<OrderModel> {
    return this.ordersService.create(dto);
  }

  @Patch(':orderId/product/:productId')
  @ApiOperation({ summary: 'Update amount of a product in an order' })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiParam({ name: 'productId', type: 'number' })
  @ApiBody({ type: UpdateOrderProductAmountDto })
  @ApiResponse({ status: 200, description: 'Updated order', type: OrderModel })
  updateProductAmount(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: UpdateOrderProductAmountDto,
  ): Promise<OrderModel> {
    return this.ordersService.updateAmount(orderId, dto.productId, dto.amount);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Order deleted', schema: { example: { deleted: true } } })
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    return this.ordersService.remove(id);
  }
}
