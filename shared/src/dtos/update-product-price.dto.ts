import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateProductPriceDto {
  @ApiProperty({ example: 99.99, description: 'New price of the product' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'ID of the product to update' })
  @IsNumber() 
  id: number;
}