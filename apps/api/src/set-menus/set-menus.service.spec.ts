import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { SetMenusService } from './set-menus.service';
import { SetMenu } from './entities/set-menu.entity';

describe('SetMenusService', () => {
  let service: SetMenusService;
  let mockRepository: Partial<Repository<SetMenu>>;
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    const mockQueryBuilder: Partial<SelectQueryBuilder<SetMenu>> = {
      select: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
      getCount: jest.fn(),
    };

    mockRepository = {
      createQueryBuilder: jest.fn(
        () => mockQueryBuilder as SelectQueryBuilder<SetMenu>,
      ),
    };

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue({
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: {
          create: jest
            .fn()
            .mockImplementation((entity, data) => ({ ...data, id: 1 })),
          save: jest
            .fn()
            .mockImplementation((entity) => Promise.resolve(entity)),
        },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetMenusService,
        { provide: 'SetMenuRepository', useValue: mockRepository },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<SetMenusService>(SetMenusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch filtered set menus', async () => {
    const mockMenus = [
      {
        set_menu_id: 1,
        set_menu_name: 'Menu 1',
        cuisineName: 'Italian',
      },
    ];

    const mockCuisinesAggregate = [
      {
        cuisineName: 'Italian',
        setMenusCount: '5',
        totalOrders: '10',
      },
    ];

    const mockCount = 5;

    const queryBuilder = mockRepository.createQueryBuilder!() as jest.Mocked<
      SelectQueryBuilder<SetMenu>
    >;
    queryBuilder.getRawMany.mockResolvedValueOnce(mockMenus);
    queryBuilder.getRawMany.mockResolvedValueOnce(mockCuisinesAggregate);
    queryBuilder.getCount.mockResolvedValueOnce(mockCount);

    const result = await service.getFilteredSetMenus('Italian', 1, 10);

    expect(result.setMenus).toHaveLength(1);
    expect(result.filters).toHaveLength(1);
    expect(result.filters[0]).toEqual({
      name: 'Italian',
      slug: 'Italian',
      number_of_orders: 10,
      set_menus_count: 5,
    });
    expect(result.meta.totalItems).toBe(mockCount);
    expect(queryBuilder.select).toHaveBeenCalled();
    expect(queryBuilder.getRawMany).toHaveBeenCalled();
    expect(queryBuilder.getCount).toHaveBeenCalled();
  });

  it('should handle fetch and ingest data', async () => {
    const mockQueryRunner = mockDataSource.createQueryRunner!();
    const mockData = [
      {
        cuisines: [{ id: 1, name: 'Italian' }],
        groups: { set_menu_id: 1 },
        id: 1,
      },
    ];

    jest.spyOn(service as any, 'fetchData').mockResolvedValue(mockData);

    await service.fetchAndIngestData();

    expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
    );
    expect(mockQueryRunner.manager.save).toHaveBeenCalled();
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
  });
});
