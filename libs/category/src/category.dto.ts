import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { Category } from './category.entity'

@InputType({ description: 'Create a category input' })
export class NewCategoryInput implements Partial<Category> {
  @Field({ description: '分类名' })
  @IsNotEmpty({ message: '分类名不能为空' })
  public label: string

  @Field({ nullable: true, description: '分类别名' })
  public slug: string

  @Field({ nullable: true, description: '描述' })
  public desc: string

  @Field({ nullable: true, description: '排序' })
  public order: number

  @IsOptional()
  @IsUUID('4', { message: '不是有效的UUID' })
  @Field(() => String, { nullable: true, description: '子分类' })
  public parent: any
}

@InputType({ description: 'Update a category input' })
export class UpdateCategoryInput extends NewCategoryInput
  implements Partial<Category> {}
