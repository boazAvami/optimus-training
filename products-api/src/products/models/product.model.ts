import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum } from '@repo/shared';
import { Category } from '../../categories/models/category.model';

export class Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  seller_name: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty({ enum: ProductStatusEnum })
  status: ProductStatusEnum;

  @ApiProperty()
  upload_date: Date;

  @ApiProperty({ type: [Category] })
  categories: Category[];
}
