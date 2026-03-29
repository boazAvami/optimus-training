import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { ProductModel } from '@repo/shared';
import { ProductIdsDto } from '@repo/shared';
import { UpdateProductPriceDto } from '@repo/shared';
import { productsServiceName } from 'src/tokens';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(productsServiceName) private readonly productsClient: ClientProxy,
  ) {}

  @Get('active')
  @ApiOperation({ summary: 'Get all active products with categories' })
  @ApiResponse({ status: 200, description: 'List of active products', type: [ProductModel] })
  async getActiveProducts() {
    return this.productsClient.send({ cmd: 'findAllActiveProducts' }, {});
  }

  @Post('by-ids')
  @ApiOperation({ summary: 'Get products by IDs' })
  @ApiBody({ type: ProductIdsDto })
  @ApiResponse({ status: 200, description: 'Products matching the IDs', type: [ProductModel] })
  async getProductsByIds(@Body() dto: ProductIdsDto) {
    return this.productsClient.send({ cmd: 'findProductsByIds' }, dto.ids);
  }

  @Post('exist')
  @ApiOperation({ summary: 'Check if products exist by IDs' })
  @ApiBody({ type: ProductIdsDto })
  @ApiResponse({
    status: 200,
    description: 'Whether products exist',
    schema: { example: { exist: true } },
  })
  async doProductsExist(@Body() dto: ProductIdsDto) {
    return this.productsClient.send({ cmd: 'doProductsExist' }, dto.ids);
  }

  @Patch(':id/price')
  @ApiOperation({ summary: 'Update product price' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateProductPriceDto })
  @ApiResponse({ status: 200, description: 'Updated product', type: ProductModel })
  async updateProductPrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductPriceDto,
  ) {
    return this.productsClient.send({ cmd: 'updateProductPrice' }, { id, price: dto.price });
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Disable a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Disabled product', type: ProductModel })
  async disableProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'disableProduct' }, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Deletion result',
    schema: { example: { deleted: true } },
  })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'deleteProduct' }, id);
  }
}
