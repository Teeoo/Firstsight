import { Field, ObjectType } from 'type-graphql';
import { User } from '@app/databases/entity/User';

@ObjectType()
export class Auth {
  @Field({ description: 'token' })
  public accessToken: string;

  @Field({ description: 'token类型' })
  public tokenType: string;

  @Field({ description: '过期时间' })
  public expiresIn: string;

  @Field(() => User, { description: '用户信息' })
  public User: User;
}
