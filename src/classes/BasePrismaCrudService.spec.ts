import { Test, TestingModule } from '@nestjs/testing';
import { BasePrismaCrudService } from './BasePrismaCrudService';
import { PrismaService } from '../prisma.service';

describe('BasePrismaCrudService', () => {
  let service: BasePrismaCrudService<any, any, any, any, any, any>;
  let prisma: PrismaService;

  const mockPrisma = {
    $anyModel: {
      count: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: 'model',
          useValue: '$anyModel',
        },
        BasePrismaCrudService,
      ],
    }).compile();

    service = module.get<BasePrismaCrudService<any, any, any, any, any, any>>(
      BasePrismaCrudService,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('count', () => {
    it('should call prisma count', async () => {
      (prisma.$anyModel.count as jest.Mock).mockResolvedValue(10);
      const result = await service.count();
      expect(prisma.$anyModel.count).toHaveBeenCalled();
      expect(result).toBe(10);
    });
  });

  describe('findOne', () => {
    it('should call prisma findUnique', async () => {
      const where = { id: '1' };
      const expectedResult = { id: 1, name: 'Test' };
      (prisma.$anyModel.findUnique as jest.Mock).mockResolvedValue(
        expectedResult,
      );
      const result = await service.findOne(where);
      expect(prisma.$anyModel.findUnique).toHaveBeenCalledWith({ where });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findMany', () => {
    it('should call prisma findMany', async () => {
      const params = { skip: 0, take: 10 };
      const expectedResult = [
        { id: 1, name: 'Test1' },
        { id: 2, name: 'Test2' },
      ];
      (prisma.$anyModel.findMany as jest.Mock).mockResolvedValue(
        expectedResult,
      );
      const result = await service.findMany(params);
      expect(prisma.$anyModel.findMany).toHaveBeenCalledWith(params);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should call prisma create', async () => {
      const data = { name: 'New Test' };
      const expectedResult = { id: 1, name: 'New Test' };
      (prisma.$anyModel.create as jest.Mock).mockResolvedValue(expectedResult);
      const result = await service.create(data);
      expect(prisma.$anyModel.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call prisma update', async () => {
      const params = { where: { id: '1' }, data: { name: 'Updated Test' } };
      const expectedResult = { id: 1, name: 'Updated Test' };
      (prisma.$anyModel.update as jest.Mock).mockResolvedValue(expectedResult);
      const result = await service.update(params);
      expect(prisma.$anyModel.update).toHaveBeenCalledWith(params);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should call prisma delete', async () => {
      const where = { id: '1' };
      const expectedResult = { id: 1, name: 'Test' };
      (prisma.$anyModel.delete as jest.Mock).mockResolvedValue(expectedResult);
      const result = await service.delete(where);
      expect(prisma.$anyModel.delete).toHaveBeenCalledWith({ where });
      expect(result).toEqual(expectedResult);
    });
  });
});
