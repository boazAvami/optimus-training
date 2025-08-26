import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
