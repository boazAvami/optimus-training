import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository, In } from 'typeorm';
import { Product } from './product.entity';
import { ProductStatusEnum } from '@repo/shared/src/entities/Product';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

const mockRepository = (): MockType<Repository<any>> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  count: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: MockType<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllActive', () => {
    it('should return active products', async () => {
      const mockProducts = [{ id: 1, status: ProductStatusEnum.ACTIVE }] as Product[];
      repo.find!.mockResolvedValue(mockProducts);

      const result = await service.findAllActive();
      expect(repo.find).toHaveBeenCalledWith({ where: { status: ProductStatusEnum.ACTIVE }, relations: ['categories'] });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findByIds', () => {
    it('should return products by ids', async () => {
      const mockProducts = [{ id: 1 }] as Product[];
      repo.find!.mockResolvedValue(mockProducts);

      const result = await service.findByIds([1, 2]);
      expect(repo.find).toHaveBeenCalledWith({ where: { id: In([1, 2]) }, relations: ['categories'] });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('doProductsExist', () => {
    it('should return true if all ids exist', async () => {
      repo.count!.mockResolvedValue(2);
      const result = await service.doProductsExist([1, 2]);
      expect(repo.count).toHaveBeenCalledWith({ where: { id: In([1, 2]) } });
      expect(result).toBe(true);
    });

    it('should return false if not all ids exist', async () => {
      repo.count!.mockResolvedValue(1);
      const result = await service.doProductsExist([1, 2]);
      expect(result).toBe(false);
    });
  });

  describe('updatePrice', () => {
    it('should update the price', async () => {
      const product = { id: 1, price: 100, save: jest.fn() } as unknown as Product;
      repo.findOne!.mockResolvedValue(product);
      repo.save!.mockResolvedValue({ ...product, price: 200 });

      const result = await service.updatePrice(1, 200);
      expect(result.price).toBe(200);
    });

    it('should throw NotFoundException if product not found', async () => {
      repo.findOne!.mockResolvedValue(null);
      await expect(service.updatePrice(1, 200)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should return true if deleted', async () => {
      repo.delete!.mockResolvedValue({ affected: 1 });
      const result = await service.deleteProduct(1);
      expect(result).toBe(true);
    });

    it('should return false if not deleted', async () => {
      repo.delete!.mockResolvedValue({ affected: 0 });
      const result = await service.deleteProduct(1);
      expect(result).toBe(false);
    });
  });

  describe('disableProduct', () => {
    it('should set status to DISABLED', async () => {
      const product = { id: 1, status: ProductStatusEnum.ACTIVE } as Product;
      repo.findOne!.mockResolvedValue(product);
      repo.save!.mockResolvedValue({ ...product, status: ProductStatusEnum.DISABLED });

      const result = await service.disableProduct(1);
      expect(result.status).toBe(ProductStatusEnum.DISABLED);
    });

    it('should throw NotFoundException if product not found', async () => {
      repo.findOne!.mockResolvedValue(null);
      await expect(service.disableProduct(1)).rejects.toThrow(NotFoundException);
    });
  });
});
