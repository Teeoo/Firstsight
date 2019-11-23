import { IsNumber, IsString } from 'class-validator';

export class Pagination {
  @IsString()
  public limit: number;

  @IsString()
  public page: number;
}
