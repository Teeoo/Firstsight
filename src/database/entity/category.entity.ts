import { App } from './app.entity';
import {
  Column,
  Entity,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';
import { Field, InputType, ObjectType } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({ implements: App, description: 'Category Type' })
@Entity()
@Tree('materialized-path')
@Unique(['label'])
export class Category extends App {
  @Field({ description: '分类名' })
  @Column({ length: 60 })
  public label: string;

  @Field({ nullable: true, description: '分类别名' })
  @Column({ nullable: true, length: 60 })
  public slug: string;

  @Field({ description: '子分类数量' })
  @Column({ default: 0 })
  public cateNum: number;

  @Field({ description: '该分类下存在的文章数量' })
  @Column({ default: 0 })
  public archNum: number;

  @Field(() => GraphQLJSON, { nullable: true, description: '子分类' })
  @TreeChildren()
  public children: Category[];

  @Field(() => String, { nullable: true, description: '上级分类' })
  @TreeParent()
  // @RelationId((category: Category) => category.parent)
  public parent: Category;
}
