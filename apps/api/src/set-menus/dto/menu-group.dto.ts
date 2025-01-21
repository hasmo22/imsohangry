import { IsNumber, IsOptional, IsObject } from 'class-validator';

export class MenuGroupDto {
  @IsNumber()
  set_menu_id: number;

  @IsObject()
  @IsOptional()
  groups: { [key: string]: number } | null;

  @IsNumber()
  @IsOptional()
  dishes_count: number | null;

  @IsNumber()
  @IsOptional()
  selectable_dishes_count: number | null;
}
