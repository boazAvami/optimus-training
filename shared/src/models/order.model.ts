import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from './product.model';

export class ProductInOrderModel {
  @ApiProperty()
  productId: ProductModel;

  @ApiProperty({ example: 2 })
  amount: number;
}
export class OrderModel {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-08-24T14:00:00Z' })
  date: Date;

  @ApiProperty({ type: [ProductInOrderModel] })
  products: ProductInOrderModel[];
}
