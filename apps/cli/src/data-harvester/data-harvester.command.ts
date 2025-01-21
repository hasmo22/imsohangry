import { Command, CommandRunner } from 'nest-commander';
import { SetMenusService } from '../../../api/src/set-menus/set-menus.service';

@Command({
  name: 'data-harvester',
  description: 'Fetches data from the test endpoint and ingests it into the database',
})
export class DataHarvester extends CommandRunner {
  constructor(private readonly setMenuService: SetMenusService) {
    super();
  }

  async run(): Promise<void> {
    await this.setMenuService.fetchAndIngestData();
  }
}
