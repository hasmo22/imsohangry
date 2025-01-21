import { Controller, Get, Query } from '@nestjs/common';
import { SetMenusService } from './set-menus.service';

@Controller('set-menus')
export class SetMenusController {
  constructor(private readonly setMenusService: SetMenusService) {}

  @Get()
  async getSetMenus(
    @Query('cuisineSlug') cuisineSlug: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.setMenusService.getFilteredSetMenus(cuisineSlug, page, limit);
  }
}
