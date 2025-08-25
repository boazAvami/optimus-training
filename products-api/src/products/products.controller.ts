import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { ProductModel } from '@repo/shared';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('active')
  @ApiOperation({ summary: 'Get all active products with categories' })
  @ApiResponse({ status: 200, description: 'List of active products', type: [ProductModel] })
  getActiveProducts(): Promise<ProductModel[]> {
    return this.productService.findAllActive();
  }

  @Get()
  @MessagePattern({ cmd: 'findProductsByIds' })
  @ApiOperation({ summary: 'Get products by IDs' })
  @ApiBody({ schema: { type: 'object', properties: { ids: { type: 'array', items: { type: 'number' } } } } })
  @ApiResponse({ status: 200, description: 'Products matching the IDs', type: [ProductModel] })
  getProductsByIds(@Body('ids') ids: number[]): Promise<ProductModel[]> {
    return this.productService.findByIds(ids);
  }

  @Get('exist')
  @MessagePattern({ cmd: 'doProductsExist' })
  @ApiOperation({ summary: 'Check if products exist by IDs' })
  @ApiBody({ schema: { type: 'object', properties: { ids: { type: 'array', items: { type: 'number' } } } } })
  @ApiResponse({ status: 200, description: 'Whether products exist', schema: { example: { exist: true } } })
  async doProductsExist(@Body('ids') ids: number[]): Promise<{ exist: boolean }> {
    const exist = await this.productService.doProductsExist(ids);
    return { exist };
  }

  @Patch(':id/price')
  @ApiOperation({ summary: 'Update product price' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdatePriceDto })
  @ApiResponse({ status: 200, description: 'Updated product', type: ProductModel })
  updateProductPrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePriceDto,
  ): Promise<ProductModel> {
    return this.productService.updatePrice(id, dto.price);
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Disable a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Disabled product', type: ProductModel })
  disableProduct(@Param('id', ParseIntPipe) id: number): Promise<ProductModel> {
    return this.productService.disableProduct(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Deletion result', schema: { example: { deleted: true } } })
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    return this.productService.deleteProduct(id).then(deleted => ({ deleted }));
  }
}
