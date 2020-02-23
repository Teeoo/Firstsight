import { ObjectType, Field, Int, ClassType } from 'type-graphql'

export function CrudPaginate<T>(TItemClass: ClassType<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class Paginate {
    @Field(() => Int, { nullable: true, description: '总数据量' })
    public total: number

    @Field(() => Int, { defaultValue: 10, description: '每页数据条数' })
    public per_page: number

    @Field(() => Int, { defaultValue: 10, description: '当前页码' })
    public current_page: number

    @Field(() => Int, {
      defaultValue: 10,
      description: '最后一页,也是总页数',
    })
    public last_page: number

    @Field(() => [TItemClass], { nullable: true })
    public data: T[]
  }
  return Paginate
}
