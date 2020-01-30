import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class BaseDto {
  @Field(type => String)
  @IsNotEmpty({ message: 'id不能为空' })
  @IsUUID('4', { message: '不是有效的UUID' })
  public id: string;
}

@ArgsType()
export class Pagination {
  @Field(type => Int, { defaultValue: 0, nullable: true })
  public page: number = 0;
  @Field(type => Int, { defaultValue: 10, nullable: true })
  public limit: number = 10;
}

export class Paginate<T> {
  public total: number;
  public per_page: number;
  public current_page: number;
  public last_page: number;
  public data: T[];
}
