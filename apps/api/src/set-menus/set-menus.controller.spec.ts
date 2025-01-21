import { Test, TestingModule } from '@nestjs/testing';
import { SetMenusController } from './set-menus.controller';
import { SetMenusService } from './set-menus.service';

describe('SetMenusController', () => {
  let controller: SetMenusController;
  let service: SetMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetMenusController],
      providers: [
        {
          provide: SetMenusService,
          useValue: {
            getFilteredSetMenus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SetMenusController>(SetMenusController);
    service = module.get<SetMenusService>(SetMenusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSetMenus', () => {
    it('should call SetMenusService with correct parameters', async () => {
      const mockResult = { data: [], meta: {} };
      const cuisineSlug = 'italian';
      const page = 2;
      const limit = 5;

      jest.spyOn(service, 'getFilteredSetMenus').mockResolvedValue(mockResult);

      const result = await controller.getSetMenus(cuisineSlug, page, limit);

      expect(service.getFilteredSetMenus).toHaveBeenCalledWith(cuisineSlug, page, limit);
      expect(result).toBe(mockResult);
    });

    it('should use default values for page and limit if not provided', async () => {
      const mockResult = { data: [], meta: {} };

      jest.spyOn(service, 'getFilteredSetMenus').mockResolvedValue(mockResult);

      const result = await controller.getSetMenus(undefined, undefined, undefined);

      expect(service.getFilteredSetMenus).toHaveBeenCalledWith(undefined, 1, 10);
      expect(result).toBe(mockResult);
    });
  });
});
