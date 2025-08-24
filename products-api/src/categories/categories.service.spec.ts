import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

const mockRepository = (): MockType<Repository<any>> => ({
  find: jest.fn(),
});

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: MockType<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getRepositoryToken(Category), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Books' },
      ] as Category[];

      repo.find!.mockResolvedValue(mockCategories);

      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });
});
