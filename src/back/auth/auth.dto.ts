import { IsNotEmpty, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '@app/databases/entity/User';

@InputType({ description: 'SignIn data' })
export class LoginUserInput implements Partial<User> {
  @Field({ description: '昵称' })
  @IsNotEmpty({ message: '昵称不能为空' })
  public name: string;

  @Field({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  public password: string;
}

@InputType({ description: 'SignUp data' })
export class NewUserInput extends LoginUserInput implements Partial<User> {
  @Field({ description: '邮箱' })
  @IsEmail({}, { message: '不是有效的邮箱哦' })
  public email: string;
}
