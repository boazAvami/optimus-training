import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryModel } from '@repo/shared';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern({ cmd: 'findAllCategories' })
  getAllCategories(): Promise<CategoryModel[]> {
    return this.categoriesService.findAll();
  }
}
