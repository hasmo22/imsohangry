import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import axios from 'axios';
import { SetMenuDto } from './dto/set-menu.dto';
import { SetMenu } from './entities/set-menu.entity';
import { SetMenuCuisineDto } from './dto/set-menu-cuisine.dto';
import { SetMenuCuisine } from './entities/set-menu-cuisine.entity';
import { CuisineDto } from './dto/cruisine.dto';
import { Cuisine } from './entities/cuisine.entity';
import { MenuGroupDto } from './dto/menu-group.dto';
import { MenuGroup } from './entities/menu-group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SetMenusService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(SetMenu)
    private readonly setMenuRepository: Repository<SetMenu>,
  ) {}

  private endpoint: string =
    'https://staging.yhangry.com/booking/test/set-menus'; // hard coded for this assignment

  /**
   * Fetch and save data to database.
   */
  async fetchAndIngestData(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();
      const data = await this.fetchData();

      for (const setMenuData of data) {
        // Insert cuisines
        await this.insertCuisines(queryRunner, setMenuData.cuisines[0]);

        // Insert SetMenu
        const savedSetMenu = await this.insertSetMenu(queryRunner, setMenuData);

        // Insert SetMenuCuisines
        await this.insertSetMenuCuisines(queryRunner, {
          set_menu_id: savedSetMenu.id,
          cuisine_id: setMenuData.cuisines[0].id,
        });

        // Insert MenuGroups
        setMenuData.groups.set_menu_id = savedSetMenu.id;
        await this.insertMenuGroups(queryRunner, setMenuData.groups);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error during data ingestion:', error.message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Fetch filtered, paginated SetMenus data with filters included in a single query.
   * @param cuisineSlug Filter by cuisine name
   * @param page Page number for pagination
   * @param limit Number of items per page
   */
  async getFilteredSetMenus(
    cuisineSlug?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const offset = (page - 1) * limit;

    // Query to get filtered set menus
    const queryBuilder = this.setMenuRepository
      .createQueryBuilder('set_menu')
      .select([
        'set_menu.id AS set_menu_id',
        'set_menu.name AS set_menu_name',
        'set_menu.description AS set_menu_description',
        'set_menu.price_per_person AS price',
        'set_menu.min_spend AS minSpend',
        'set_menu.thumbnail AS set_menu_thumbnail',
        'cuisine.name AS cuisineName',
        'set_menu.number_of_orders AS set_menu_number_of_orders',
      ])
      .leftJoin('set_menu.cuisines', 'set_menu_cuisines')
      .leftJoin('set_menu_cuisines.cuisine', 'cuisine')
      .where('set_menu.status = :status', { status: 1 }) // Only live menus
      .orderBy('set_menu.number_of_orders', 'DESC') // Sort by popularity
      .offset(offset)
      .limit(limit);

    // Filter by cuisine if specified
    if (cuisineSlug) {
      queryBuilder.andWhere('cuisine.name = :cuisineSlug', { cuisineSlug });
    }

    const rawResults = await queryBuilder.getRawMany();

    // Query to get cuisine-wide aggregates ordered by number_of_orders
    const cuisinesAggregate = await this.setMenuRepository
      .createQueryBuilder('set_menu')
      .select([
        'cuisine.name AS cuisineName',
        'COUNT(DISTINCT set_menu.id) AS setMenusCount',
        'SUM(set_menu.number_of_orders) AS totalOrders',
      ])
      .leftJoin('set_menu.cuisines', 'set_menu_cuisines')
      .leftJoin('set_menu_cuisines.cuisine', 'cuisine')
      .where('set_menu.status = :status', { status: 1 })
      .groupBy('cuisine.name')
      .orderBy('totalOrders', 'DESC')
      .getRawMany();

    const setMenus = [];
    const cuisineCountsMap = new Map<
      string,
      {
        name: string;
        slug: string;
        number_of_orders: number;
        set_menus_count: number;
      }
    >();

    rawResults.forEach((result) => {
      // Group cuisines into menus
      let existingMenu = setMenus.find(
        (menu) => menu.id === result.set_menu_id,
      );

      if (!existingMenu) {
        existingMenu = {
          id: result.set_menu_id,
          name: result.set_menu_name,
          description: result.set_menu_description,
          price: result.price,
          minSpend: result.minSpend,
          thumbnail: result.set_menu_thumbnail,
          cuisines: [],
          number_of_orders: result.set_menu_number_of_orders,
        };
        setMenus.push(existingMenu);
      }

      if (result.cuisineName) {
        existingMenu.cuisines.push({ name: result.cuisineName });
      }
    });

    // Populate the cuisine filters using aggregated data
    cuisinesAggregate.forEach((cuisine) => {
      cuisineCountsMap.set(cuisine.cuisineName, {
        name: cuisine.cuisineName,
        slug: cuisine.cuisineName, // Assuming slug matches the name
        number_of_orders: parseInt(cuisine.totalOrders, 10) || 0,
        set_menus_count: parseInt(cuisine.setMenusCount, 10) || 0,
      });
    });

    // Convert cuisine counts map to an array
    const filters = Array.from(cuisineCountsMap.values());

    const totalItems = await queryBuilder.getCount(); // Total filtered set menus
    const meta = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit,
    };

    return {
      setMenus,
      filters,
      meta,
    };
  }

  private async fetchData(): Promise<any> {
    const response = await axios.get(this.endpoint);
    const data = response.data;

    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format received from the endpoint.');
    }
    return data.data;
  }

  private async insertCuisines(
    queryRunner,
    cuisine: CuisineDto,
  ): Promise<void> {
    const newCuisine = queryRunner.manager.create(Cuisine, cuisine);
    await queryRunner.manager.save(Cuisine, newCuisine);
  }

  private async insertSetMenu(
    queryRunner,
    setMenuData: SetMenuDto,
  ): Promise<SetMenu> {
    const setMenu = queryRunner.manager.create(SetMenu, setMenuData);
    return queryRunner.manager.save(SetMenu, setMenu);
  }

  private async insertSetMenuCuisines(
    queryRunner,
    setMenuCuisineData: SetMenuCuisineDto,
  ): Promise<void> {
    const setMenuCuisine = queryRunner.manager.create(
      SetMenuCuisine,
      setMenuCuisineData,
    );
    await queryRunner.manager.save(SetMenuCuisine, setMenuCuisine);
  }

  private async insertMenuGroups(
    queryRunner,
    menuGroupData: MenuGroupDto,
  ): Promise<void> {
    const menuGroup = queryRunner.manager.create(MenuGroup, menuGroupData);
    await queryRunner.manager.save(MenuGroup, menuGroup);
  }
}
