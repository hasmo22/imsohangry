import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SetMenu } from './set-menu.entity';

@Entity('menu_groups')
export class MenuGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  set_menu_id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  groups: { [key: string]: number } | null;

  @Column({ type: 'int', nullable: true })
  dishes_count: number | null;

  @Column({ type: 'int', nullable: true })
  selectable_dishes_count: number | null;

  @ManyToOne(() => SetMenu, (setMenu) => setMenu.menuGroups)
  @JoinColumn({ name: 'set_menu_id' })
  setMenu: SetMenu;
}
