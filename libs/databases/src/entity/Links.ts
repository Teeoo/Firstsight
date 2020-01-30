import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { App } from './App';

@ObjectType({ implements: App, description: 'Links Types' })
@Entity()
export class Links extends App {
  @Field({ description: '友情链接地址' })
  @Column()
  public url: string;

  @Field({ description: '友情链接名称' })
  @Column()
  public name: string;

  @Field({ nullable: true, description: '站长EMAIL' })
  @Column({ nullable: true })
  public email: string;

  @Field({ nullable: true, description: '友情链接logo' })
  @Column({ nullable: true })
  public logo: string;

  @Field({ defaultValue: '_blank', description: '友情链接打开方式' })
  @Column({ default: '_blank' })
  public target: string;

  @Field({ defaultValue: true, description: '状态，1显示，0不显示' })
  @Column({ default: true })
  public status: boolean;
}
