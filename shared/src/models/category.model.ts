import { ApiProperty } from '@nestjs/swagger';

export class CategoryModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
