import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { SetMenuCuisine } from './set-menu-cuisine.entity';
import { MenuGroup } from './menu-group.entity';

@Entity('set_menus')
export class SetMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  display_text: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ type: 'boolean', default: false })
  is_vegan: boolean;

  @Column({ type: 'boolean', default: false })
  is_vegetarian: boolean;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_person: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  min_spend: number;

  @Column({ type: 'boolean', default: false })
  is_seated: boolean;

  @Column({ type: 'boolean', default: false })
  is_standing: boolean;

  @Column({ type: 'boolean', default: false })
  is_canape: boolean;

  @Column({ type: 'boolean', default: false })
  is_mixed_dietary: boolean;

  @Column({ type: 'boolean', default: false })
  is_meal_prep: boolean;

  @Column({ type: 'boolean', default: false })
  is_halal: boolean;

  @Column({ type: 'boolean', default: false })
  is_kosher: boolean;

  @Column('text', { nullable: true })
  price_includes: string;

  @Column('text', { nullable: true })
  highlight: string;

  @Column({ type: 'boolean', default: false })
  available: boolean;

  @Column({ type: 'int', default: 0 })
  number_of_orders: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SetMenuCuisine, (setMenuCuisine) => setMenuCuisine.setMenu)
  cuisines: SetMenuCuisine[];

  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.setMenu)
  menuGroups: MenuGroup[];
}
