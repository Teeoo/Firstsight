import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Tags } from '../../database/entity/tags.entity';

@InputType({ description: 'Create a tags input' })
export class NewTagsInput implements Partial<Tags> {
  @Field({ description: '标签名' })
  @IsNotEmpty({ message: '标签名不能为空' })
  public label: string;

  @Field({ nullable: true, description: '别名' })
  @IsOptional()
  public slug: string;

  @Field({ nullable: true, description: '颜色' })
  @IsOptional()
  public color: string;
}

@InputType({ description: 'Update a tags input' })
export class UpdateTagsInput extends NewTagsInput implements Partial<Tags> {}
