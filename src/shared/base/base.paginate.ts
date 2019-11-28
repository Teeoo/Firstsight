import { ObjectType, Field, Int, ClassType } from 'type-graphql';

export function BasePaginate<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class Paginate {
    @Field(type => Int, { defaultValue: 10 })
    public limit: number;

    @Field(type => Int, { nullable: true })
    public total: number;

    @Field(type => Int, { nullable: true })
    public count: number;

    @Field(type => [TItemClass], { nullable: true })
    public data: TItem[];
  }
  return Paginate;
}
