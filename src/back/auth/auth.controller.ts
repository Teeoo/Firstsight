import { Controller, Body, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserInput } from './auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @author lee
   * @date 2020-01-18
   * @param {AuthService} authService
   * @memberof AuthController
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @description 登陆
   * @author lee
   * @date 2020-01-18
   * @param {LoginUserInput} data
   * @param {Request} req
   * @returns
   * @memberof AuthController
   */
  @Post('SignIn')
  public async SignIn(@Body() data: LoginUserInput, @Req() req: Request) {
    return await this.authService.SignIn(data, req.ip);
  }
}
