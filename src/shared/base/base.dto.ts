import { IsNotEmpty, IsUUID } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class BaseDto {
  @Field(type => String)
  @IsNotEmpty({ message: 'id不能为空' })
  @IsUUID('4', { message: '不是有效的UUID' })
  public id: string;
}
