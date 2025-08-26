import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductIdsDto {
  @ApiProperty({ type: [Number], description: 'Array of product IDs to check' })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[];
}
