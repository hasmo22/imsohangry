import { IsString, IsOptional, IsBoolean, IsNumber, IsDate, IsArray, IsObject } from 'class-validator';

export class SetMenuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  display_text: boolean;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsBoolean()
  is_vegan: boolean;

  @IsBoolean()
  is_vegetarian: boolean;

  @IsNumber()
  status: number;

  @IsNumber()
  price_per_person: number;

  @IsOptional()
  @IsNumber()
  min_spend: number;

  @IsBoolean()
  is_seated: boolean;

  @IsBoolean()
  is_standing: boolean;

  @IsBoolean()
  is_canape: boolean;

  @IsBoolean()
  is_mixed_dietary: boolean;

  @IsBoolean()
  is_meal_prep: boolean;

  @IsBoolean()
  is_halal: boolean;

  @IsBoolean()
  is_kosher: boolean;

  @IsOptional()
  @IsString()
  price_includes: string;

  @IsOptional()
  @IsString()
  highlight: string;

  @IsBoolean()
  available: boolean;

  @IsNumber()
  number_of_orders: number;

  @IsDate()
  created_at: Date;

  @IsArray()
  cuisines: any[]; // change this to CuisineDto

  @IsObject()
  groups: any; // change this to MenuGroupDto
}
