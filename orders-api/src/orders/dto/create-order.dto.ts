import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductInOrderDto {
  productId: number;
  amount: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInOrderDto)
  products: ProductInOrderDto[];
}
