import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
} from 'typeorm';
import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType({ description: 'Interface Type' })
export abstract class App {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: '排序' })
  @Column({ default: 0 })
  public order: number;

  @Field({ description: '描述' })
  @Column({ default: '这是一段默认的描述' })
  public desc: string;

  @Field({ description: '创建时间' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @Field({ description: '最后修改时间' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  // @VersionColumn()
  // public version: number;
}
