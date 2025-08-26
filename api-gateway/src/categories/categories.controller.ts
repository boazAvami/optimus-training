import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { CategoryModel } from '@repo/shared';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of categories', type: [CategoryModel] })
  async getAllCategories() {
    return this.productsClient.send({ cmd: 'findAllCategories' }, {});
  }
}
