import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from 'type-graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetRecipesArgs {
  @IsNumber()
  @Field(type => Int, { defaultValue: 0, nullable: true })
  public page: number = 0;

  @IsNumber()
  @Field(type => Int, { defaultValue: 10, nullable: true })
  public limit: number = 10;
}
