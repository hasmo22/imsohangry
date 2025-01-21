import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetMenu } from './set-menus/entities/set-menu.entity';
import { Cuisine } from './set-menus/entities/cuisine.entity';
import { SetMenuCuisine } from './set-menus/entities/set-menu-cuisine.entity';
import { MenuGroup } from './set-menus/entities/menu-group.entity';
// import { DataHarvester } from './data-harvester/data-harvester.command';
// import { SetMenusService } from './set-menus/set-menus.service';
import { SetMenusModule } from './set-menus/set-menus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dbuser',
      password: 'password',
      database: 'yhangrydb',
      entities: [SetMenu, Cuisine, SetMenuCuisine, MenuGroup],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SetMenu, Cuisine, SetMenuCuisine, MenuGroup]),
    SetMenusModule,
  ],
  controllers: [],
  // providers: [DataHarvester],
})
export class AppModule {}
