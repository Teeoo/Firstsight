import { Resolver, Query, Args, Context } from '@nestjs/graphql'
import { AuthService } from '@app/auth'
import { Auth } from '@app/auth/auth.types'
import { LoginUserInput } from '@app/auth/auth.dto'

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
    return await this.authService.SignIn(data, ctx.req.ip)
  }
}
