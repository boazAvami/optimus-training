import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class UpdatePriceDto {
  
  @ApiProperty()
  @IsPositive()
  price: number;
}
