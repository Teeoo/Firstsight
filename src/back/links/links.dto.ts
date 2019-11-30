import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, IsOptional, IsUrl, IsEmail } from 'class-validator';
import { Links } from '../../database/entity/links.entity';

@InputType({ description: 'create Links data' })
export class NewLinksInput implements Partial<Links> {
  @Field({ description: '友情链接地址' })
  @IsNotEmpty({ message: 'url不可为空' })
  @IsUrl({}, { message: '不是有效的url' })
  public url: string;

  @Field({ description: '友情链接名称' })
  @IsNotEmpty({ message: '友情链接名称不可为空' })
  public name: string;

  @Field({ nullable: true, description: '站长EMAIL' })
  @IsEmail({}, { message: '不是有效的email' })
  @IsOptional()
  public email: string;

  @Field({ nullable: true, description: '友情链接logo' })
  @IsOptional()
  public logo: string;

  @Field({ defaultValue: '_blank', description: '友情链接打开方式' })
  @IsOptional()
  public target: string;

  @Field({
    defaultValue: '作者太懒了,并没有添加描述哦!',
    description: '友情链接描述',
  })
  @IsOptional()
  public desc: string;

  @Field({ defaultValue: true, description: '状态，1显示，0不显示' })
  @IsOptional()
  public status: boolean;
}

@InputType({ description: 'update Links data' })
export class UpdateLinksInput extends NewLinksInput implements Partial<Links> {}
