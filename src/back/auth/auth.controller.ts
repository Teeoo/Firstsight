import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserInput, NewUserInput } from './auth.dto';
import { Request } from 'express';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param {AuthService} authService
   * @memberof AuthController
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @description
   * @param {NewUserInput} data
   * @param {Request} req
   * @returns
   * @memberof AuthController
   */
  @Post('SignUp')
  public async SignUp(@Body() data: NewUserInput, @Req() req: Request) {
    return await this.authService.SignUp(data, req.ip);
  }

  /**
   * @description
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
