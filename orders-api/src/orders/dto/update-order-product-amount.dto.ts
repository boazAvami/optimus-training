import { IsNumber } from 'class-validator';

export class UpdateOrderProductAmountDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
