import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryModel } from '@repo/shared';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<CategoryModel[]> {
    const categories = await this.categoryRepo.find({ relations: ['products'] });
    return plainToInstance(CategoryModel, categories);
  }
}
