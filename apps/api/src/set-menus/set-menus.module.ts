import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetMenu } from './entities/set-menu.entity';
import { SetMenuCuisine } from './entities/set-menu-cuisine.entity';
import { Cuisine } from './entities/cuisine.entity';
import { MenuGroup } from './entities/menu-group.entity';
import { SetMenusService } from './set-menus.service';
import { SetMenusController } from './set-menus.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SetMenu, SetMenuCuisine, Cuisine, MenuGroup]),
  ],
  controllers: [SetMenusController],
  providers: [SetMenusService],
  exports: [SetMenusService],
})
export class SetMenusModule {}
