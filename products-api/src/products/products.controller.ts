import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductIdsDto, ProductModel, UpdateProductPriceDto } from '@repo/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @MessagePattern({ cmd: 'findProductsByIds' })
  findByIds(@Payload() ids: number[]): Promise<ProductModel[]> {
    return this.productService.findByIds(ids ?? []);
  }

  @MessagePattern({ cmd: 'doProductsExist' })
  async doExist(@Payload() payload: ProductIdsDto): Promise<{ exist: boolean }> {
    const exist = await this.productService.doProductsExist(payload.ids);
    return { exist };
  }

  @MessagePattern({ cmd: 'updateProductPrice' })
  updatePrice(
    @Payload() payload: UpdateProductPriceDto,
  ): Promise<ProductModel> {
    return this.productService.updatePrice(payload.id, payload.price);
  }

  @MessagePattern({ cmd: 'disableProduct' })
  disable(@Payload() id: number): Promise<ProductModel> {
    return this.productService.disableProduct(id);
  }

  @MessagePattern({ cmd: 'deleteProduct' })
  async delete(@Payload() id: number): Promise<{ deleted: boolean }> {
    const deleted = await this.productService.deleteProduct(id);
    return { deleted };
  }
 
  @MessagePattern({ cmd: 'findAllActiveProducts' })
  getActiveProducts(): Promise<ProductModel[]> {
    return this.productService.findAllActive();
  }
}
