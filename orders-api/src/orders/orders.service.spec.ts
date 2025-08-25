// src/orders/orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductOrder } from './entities/product-order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderModel } from '@repo/shared';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepo: Repository<Order>;
  let productOrdersRepo: Repository<ProductOrder>;

  const mockOrderEntity = {
    id: 1,
    date: new Date('2025-08-24T14:00:00Z'),
    products: [
      { productId: 1, amount: 2 },
    ],
  } as unknown as Order;

  const mockOrderEntityArray = [mockOrderEntity];

  const mockOrdersRepo = {
    find: jest.fn().mockResolvedValue(mockOrderEntityArray),
    findOne: jest.fn().mockResolvedValue(mockOrderEntity),
    create: jest.fn().mockReturnValue(mockOrderEntity),
    save: jest.fn().mockResolvedValue(mockOrderEntity),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockProductOrdersRepo = {
    create: jest.fn().mockImplementation(p => p),
    findOne: jest.fn().mockResolvedValue(mockOrderEntity.products[0]),
    save: jest.fn().mockResolvedValue(mockOrderEntity.products[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: mockOrdersRepo },
        { provide: getRepositoryToken(ProductOrder), useValue: mockProductOrdersRepo },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    ordersRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
    productOrdersRepo = module.get<Repository<ProductOrder>>(getRepositoryToken(ProductOrder));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', async () => {
    const result: OrderModel[] = await service.findAll();
    expect(result).toHaveLength(1);
    expect(ordersRepo.find).toHaveBeenCalled();
  });

  it('should return a single order by id', async () => {
    const result: OrderModel = await service.findOne(1);
    expect(result.id).toBe(mockOrderEntity.id);
    expect(ordersRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['products'] });
  });

  it('should create a new order', async () => {
    const dto: CreateOrderDto = { products: [{ productId: 1, amount: 2 }] };
    const result: OrderModel = await service.create(dto);
    expect(result.id).toBe(mockOrderEntity.id);
    expect(ordersRepo.save).toHaveBeenCalled();
  });

  it('should update product amount', async () => {
    const result: OrderModel = await service.updateAmount(1, 1, 5);
    expect(result.id).toBe(mockOrderEntity.id);
    expect(productOrdersRepo.save).toHaveBeenCalled();
  });

  it('should remove an order', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(ordersRepo.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if product not found when updating amount', async () => {
    mockProductOrdersRepo.findOne.mockResolvedValueOnce(null);
    await expect(service.updateAmount(1, 999, 5)).rejects.toThrow('Product 999 not found in order 1');
  });
});
