import { Field, ObjectType } from 'type-graphql';
import { User } from '../../database/entity/user.entity';

@ObjectType()
export class Auth {
  @Field({ description: 'token' })
  public accessToken: string;

  @Field({ description: 'token类型' })
  public tokenType: string;

  @Field(() => String, { description: '过期时间' })
  public expiresIn: string;

  @Field(() => User, { description: '用户信息' })
  public User: User;
}
