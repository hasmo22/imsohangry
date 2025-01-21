import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SetMenuCuisine } from './set-menu-cuisine.entity';

@Entity('cuisines')
export class Cuisine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SetMenuCuisine, (setMenuCuisine) => setMenuCuisine.cuisine)
  setMenus: SetMenuCuisine[];
}
