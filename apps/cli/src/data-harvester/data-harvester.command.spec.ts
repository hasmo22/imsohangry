import { Test, TestingModule } from '@nestjs/testing';
import { DataHarvester } from './data-harvester.command';
import { SetMenusService } from '../../../api/src/set-menus/set-menus.service';

describe('DataHarvester Command', () => {
  let command: DataHarvester;
  let mockSetMenusService: Partial<SetMenusService>;

  beforeEach(async () => {
    // Create a mock SetMenusService
    mockSetMenusService = {
      fetchAndIngestData: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataHarvester,
        { provide: SetMenusService, useValue: mockSetMenusService },
      ],
    }).compile();

    command = module.get<DataHarvester>(DataHarvester);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetchAndIngestData successfully', async () => {
    // Mock fetchAndIngestData to resolve
    (mockSetMenusService.fetchAndIngestData as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(command.run()).resolves.toBeUndefined();

    expect(mockSetMenusService.fetchAndIngestData).toHaveBeenCalledTimes(1);
  });

  it('should handle errors from fetchAndIngestData', async () => {
    // Mock fetchAndIngestData to throw an error
    const mockError = new Error('Test error');
    (mockSetMenusService.fetchAndIngestData as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(command.run()).rejects.toThrow('Test error');

    expect(mockSetMenusService.fetchAndIngestData).toHaveBeenCalledTimes(1);
  });
});
