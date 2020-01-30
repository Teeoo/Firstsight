import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { App } from './App';
import { Article } from './Article';

@ObjectType({ implements: App, description: 'Tags Types' })
@Entity()
@Unique(['label'])
export class Tags extends App {
  @Field({ description: '标签' })
  @Column({ length: 200 })
  public label: string;

  @Field({ nullable: true, description: ' 别名' })
  @Column({ nullable: true, length: 200 })
  public slug: string;

  @Field(() => String, { nullable: true, description: '颜色' })
  @Column({ nullable: true })
  public color: string;

  @Field({ defaultValue: 0, description: '热度' })
  @Column({ default: 0 })
  public hot: number;

  @Field(type => Article, { description: '文章' })
  @ManyToMany(
    () => Article,
    article => article.tags,
  )
  public article: Article[];
}
