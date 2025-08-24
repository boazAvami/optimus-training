import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './product.entity';
import { ProductStatusEnum } from '@repo/shared';
import { Product as ProductModel } from './models/product.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async findAllActive(): Promise<ProductModel[]> {
    const products = await this.repo.find({ where: { status: ProductStatusEnum.ACTIVE }, relations: ['categories'] });
    return plainToInstance(ProductModel, products);
  }

  async findByIds(ids: number[]): Promise<ProductModel[]> {
    const products = await this.repo.find({ where: { id: In(ids) }, relations: ['categories'] });
    return plainToInstance(ProductModel, products);
  }

  async doProductsExist(ids: number[]): Promise<boolean> {
    const count = await this.repo.count({ where: { id: In(ids) } });
    return count === ids.length;
  }

  async updatePrice(id: number, price: number): Promise<ProductModel> {
    const product = await this.repo.findOne({ where: { id }, relations: ['categories'] });
    if (!product) throw new NotFoundException('Product not found');
    product.price = price;
    const updated = await this.repo.save(product);
    return plainToInstance(ProductModel, updated);
  }

  async disableProduct(id: number): Promise<ProductModel> {
    const product = await this.repo.findOne({ where: { id }, relations: ['categories'] });
    if (!product) throw new NotFoundException('Product not found');
    product.status = ProductStatusEnum.DISABLED;
    const updated = await this.repo.save(product);
    return plainToInstance(ProductModel, updated);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const res = await this.repo.delete(id);
    return typeof res.affected === 'number' && res.affected > 0;
  }
}
