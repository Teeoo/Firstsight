import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput, NewUserInput } from './auth.dto';
import { User } from '../../database/entity/user.entity';
import { Auth } from './auth.type';

@Resolver('Auth')
export class AuthResolver {
  /**
   * Creates an instance of AuthResolver.
   * @param {AuthService} authService
   * @memberof AuthResolver
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @description
   * @param {NewUserInput} data
   * @param {*} ctx
   * @returns
   * @memberof AuthResolver
   */
  @Mutation(() => User, { description: 'SignUp' })
  public async SignUp(@Args('data') data: NewUserInput, @Context() ctx: any) {
    return await this.authService.SignUp(data, ctx.req.ip);
  }

  /**
   * @description
   * @param {LoginUserInput} data
   * @param {*} ctx
   * @returns
   * @memberof AuthResolver
   */
  @Query(() => Auth, { description: 'SignIn' })
  public async SignIn(@Args('data') data: LoginUserInput, @Context() ctx: any) {
    return await this.authService.SignIn(data, ctx.req.ip);
  }
}
