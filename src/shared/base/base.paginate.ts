import { ObjectType, Field, Int, ClassType } from 'type-graphql';

export function BasePaginate<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class Paginate {
    @Field(type => Int, { defaultValue: 10 })
    public itemCount: number;

    @Field(type => Int, { nullable: true })
    public totalItems: number;

    @Field(type => Int, { nullable: true })
    public pageCount: number;

    @Field(type => String, { nullable: true })
    public next: string;

    @Field(type => String, { nullable: true })
    public previous: string;

    @Field(type => [TItemClass], { nullable: true })
    public items: TItem[];
  }
  return Paginate;
}
