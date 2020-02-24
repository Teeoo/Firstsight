import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { Article } from './article.entity'
import { Category } from '@app/category/category.entity'
import { Tags } from '@app/tags/tags.entity'
import { Fields } from '@app/fields/fields.entity'
import { NewTagsInput } from '@app/tags/tags.dto'
import { NewFieldsInput } from '@app/fields/fields.dto'

@InputType({ description: 'Create a article input' })
export class NewArticleInput implements Partial<Article> {
  @IsNotEmpty({ message: '标题不可为空' })
  @Field({ description: '文章标题' })
  public title: string

  @Field({ nullable: true, description: '文章别名' })
  public slug: string

  @Field({ nullable: true, description: '文章封面' })
  public cover: string

  @Field({ nullable: true, description: '内容摘要' })
  public summary: string

  @IsNotEmpty({ message: '文章内容不可为空' })
  @Field({ description: '文章内容' })
  public text: string

  @Field({ nullable: true, description: '文章解析内容' })
  public html: string
  
  @IsOptional()
  @IsUUID('4', { message: '不是有效的UUID' })
  @Field(() => String, { nullable: true, description: '文章分类' })
  public category: Category

  @Field(() => [NewTagsInput], { nullable: true, description: '文章标签' })
  public tags: Tags[]

  @Field({ nullable: true, defaultValue: 'default', description: '模板' })
  public template: string

  @IsNotEmpty({ message: '内容类别不可为空' })
  @Field({ defaultValue: 'article', description: '内容类别' })
  public type: string

  @Field({ defaultValue: true, description: '发布状态' })
  public status: boolean

  @Field({
    description: '内容公开状态',
    nullable: true,
  })
  public publish: string

  @Field({ nullable: true, description: '密码' })
  public password: string

  @Field({ defaultValue: true, description: '是否允许评论' })
  public allowComment: boolean

  @Field({ defaultValue: false, description: '是否置顶' })
  public isTop: boolean

  @Field(() => [NewFieldsInput], {
    nullable: true,
    description: '自定义字段',
  })
  public fields: Fields[]
}

@InputType({ description: 'Update a article input' })
export class UpdateArticleInput extends NewArticleInput {}
