import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { SetMenu } from './set-menu.entity';
import { Cuisine } from '../../set-menus/entities/cuisine.entity';

@Entity('set_menu_cuisines')
export class SetMenuCuisine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  set_menu_id: number;

  @Column()
  cuisine_id: number;

  @ManyToOne(() => SetMenu, (setMenu) => setMenu.cuisines)
  @JoinColumn({ name: 'set_menu_id' })
  setMenu: SetMenu;

  @ManyToOne(() => Cuisine, (cuisine) => cuisine.setMenus)
  @JoinColumn({ name: 'cuisine_id' })
  cuisine: Cuisine;
}
