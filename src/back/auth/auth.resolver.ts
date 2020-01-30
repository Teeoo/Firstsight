import { Resolver, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './auth.dto';
import { Auth } from './auth.types';

@Resolver('Auth')
export class AuthResolver {
  /**
   * Creates an instance of AuthResolver.
   * @author lee
   * @date 2020-01-18
   * @param {AuthService} authService
   * @memberof AuthResolver
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @description SignIn
   * @author lee
   * @date 2020-01-18
   * @param {LoginUserInput} data
   * @param {*} ctx
   * @returns {Promise<Auth>}
   * @memberof AuthResolver
   */
  @Query(() => Auth, { description: 'SignIn' })
  public async SignIn(
    @Args('data') data: LoginUserInput,
    @Context() ctx: any,
  ): Promise<Auth> {
    return await this.authService.SignIn(data, ctx.req.ip);
  }
}
