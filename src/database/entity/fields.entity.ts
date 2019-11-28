import { App } from './app.entity';
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Article } from './article.entity';

@ObjectType({
  implements: App,
  description: 'Fields Type',
})
@Entity()
export class Fields extends App {
  @Field({ nullable: true, description: '字段名' })
  @Column({
    nullable: true,
    comment: '字段名',
  })
  public name: string;

  @Field({ nullable: true, description: '字段类型' })
  @Column({
    nullable: true,
    comment: '字段类型',
  })
  public type: string;

  @Field({ nullable: true, description: '值' })
  @Column({
    nullable: true,
    comment: '值',
  })
  public value: string;

  @Field(() => [Article], { nullable: true, description: '相关文章' })
  @ManyToMany(() => Article)
  public article: Article[];
}
