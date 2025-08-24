import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
