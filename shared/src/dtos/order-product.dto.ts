import { IsNumber, IsPositive } from 'class-validator';

export class OrderProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
