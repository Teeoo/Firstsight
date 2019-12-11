import { App } from './app.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import GraphQLJSON from 'graphql-type-json';
import { ObjectType, Field } from 'type-graphql';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Tags } from './tags.entity';
import { Fields } from './fields.entity';
import { type } from 'os';

@ObjectType({ implements: App, description: 'Article Type' })
@Entity()
export class Article extends App {
  @Field({ description: '文章标题' })
  @Column({ length: 200 })
  public title: string;

  @Field({ nullable: true, description: '文章别名' })
  @Column({ length: 200, nullable: true })
  public slug: string;

  @Field({ nullable: true, description: '文章封面' })
  @Column({ nullable: true })
  public cover: string;

  @Field({ nullable: true, description: '内容摘要' })
  @Column({ nullable: true })
  public summary: string;

  @Field({ nullable: true, description: '文章内容' })
  @Column({ type: 'text', nullable: true })
  public text: string;

  @Field({ nullable: true, description: '解析内容' })
  @Column({ type: 'text', nullable: true })
  public html: string;

  // @Field(() => GraphQLJSON, { nullable: true, description: 'toc' })
  // @Column({ type: 'json', nullable: true })
  // public toc: object;

  @Field({ nullable: true, description: '页面模板' })
  @Column({ default: 'default', nullable: true })
  public template: string;

  @Field({ description: '内容类别:{"article":"文章","page":"页面"}' })
  @Column({ type: 'enum', enum: ['article', 'page'] })
  public type: string;

  @Field({ description: '发布状态:{"发布":true,"草稿":false}' })
  @Column({ default: true })
  public status: boolean;

  @Field({
    description:
      '内容公开状态:{"publish":"公开","hidden":"隐藏","password":"密码保护"}',
  })
  @Column({
    type: 'enum',
    enum: ['publish', 'hidden', 'password'],
    default: 'publish',
  })
  public publish: string;

  @Column({
    default: 1,
    comment: '文章转载状态:{"原创":1,"转载":2,"混合":3}',
  })
  public origin: number;

  @Field({ nullable: true, description: '密码' })
  @Column({ nullable: true })
  public password: string;

  @Field({
    defaultValue: true,
    description: '是否允许评论:{"允许":true,"不允许":false}',
  })
  @Column({
    default: true,
  })
  public allowComment: boolean;

  @Field({ description: '是否置顶:{"是":true,"否":false}' })
  @Column({
    default: false,
  })
  public isTop: boolean;

  @Field(() => GraphQLJSON, { nullable: true, description: '扩展信息' })
  @Column({
    type: 'json',
    default: {
      view: 0,
      comments: 0,
      links: null,
    },
    nullable: true,
    comment: '扩展信息',
  })
  public exinfo: {
    views: number;
    comments: number;
    links: string;
  };

  @Field(() => User, {
    description: '作者',
  })
  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  public author: User;

  @Field(() => Category, { nullable: true, description: '分类' })
  @ManyToOne(
    () => Category,
    cate => cate.article,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  public category: Category;

  @Field(() => [Fields], { nullable: true, description: '自定义字段' })
  @ManyToMany(() => Fields, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  public fields: Fields[];

  @Field(() => [Tags], { nullable: true, description: '标签' })
  @ManyToMany(() => Tags, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  public tags: Tags[];

  // @Field(() => [Comments], { nullable: true, description: '评论' })
  // @OneToMany(type => Comments, comments => comments.article, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   eager: true,
  // })
  // public comments: Comments[];
}
