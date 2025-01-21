import { IsNumber } from 'class-validator';

export class SetMenuCuisineDto {
  @IsNumber()
  set_menu_id: number;

  @IsNumber()
  cuisine_id: number;
}
