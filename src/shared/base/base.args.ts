import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from 'type-graphql';

@ArgsType()
export class GetRecipesArgs {
  @Field(type => Int, { defaultValue: 0, nullable: true })
  public page: number;

  @Field(type => Int, { defaultValue: 10, nullable: true })
  public limit: number;

  @Field(type => String, {
    defaultValue: '',
    nullable: true,
  })
  public route: string;
}
