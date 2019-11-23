import { Column, Entity, Unique } from 'typeorm';
import { App } from './app.entity';
import { Expose } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType({
  implements: App,
  description: 'User Type',
})
@Entity()
@Unique(['name', 'email'])
export class User extends App {
  @Field({ description: '昵称' })
  @Column({ length: 32 })
  public name: string;

  @Column({
    comment: '密码',
  })
  public password: string;

  @Column({
    comment: 'salt',
  })
  public salt: string;

  @Field({ description: '邮箱' })
  @Column({
    length: 200,
    comment: '邮箱',
  })
  public email: string;

  @Field({ nullable: true, description: '头像地址' })
  @Column({
    nullable: true,
    comment: '头像地址',
  })
  public avatar: string;

  @Field({ nullable: true, description: '用户主页' })
  @Column({
    length: 200,
    nullable: true,
    comment: '用户主页',
  })
  public url: string;

  @Field({ nullable: true, description: '用户显示名称' })
  @Column({
    length: 30,
    nullable: true,
    comment: '用户显示名称',
  })
  public screenName: string;

  @Field(() => GraphQLJSON, { nullable: true, description: '扩展信息' })
  @Column({
    type: 'json',
    nullable: true,
    comment: '扩展信息',
  })
  public exInfo: string[];

  @Field({ nullable: true, description: '上次登录 ip' })
  @Column({
    nullable: true,
    comment: '上次登录 ip',
  })
  public lastIp: string;

  @Field({ nullable: true, description: '上次登录时间' })
  @Column({
    default: () => `now()`,
    nullable: true,
    comment: ' 上次登录时间',
  })
  public lastTime: Date;

  @Expose({ name: 'password' })
  private getPassword() {
    return '请刮开->█████████';
  }

  @Expose({ name: 'salt' })
  private getSalt() {
    return '******就不给你看******';
  }
}
