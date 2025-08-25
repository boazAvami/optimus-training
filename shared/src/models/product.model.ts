import { ApiProperty } from '@nestjs/swagger';
import { CategoryModel } from './category.model';

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export class ProductModel {
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

  @ApiProperty({ type: [CategoryModel] })
  categories: CategoryModel[];
}
