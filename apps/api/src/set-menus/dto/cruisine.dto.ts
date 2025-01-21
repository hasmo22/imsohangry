import { IsString } from 'class-validator';

export class CuisineDto {
  @IsString()
  name: string;
}
