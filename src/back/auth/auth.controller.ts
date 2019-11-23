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
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  public async SignUp(@Body() data: NewUserInput, @Req() req: Request) {
    return await this.authService.SignUp(data, req.ip);
  }

  @Post('SignIn')
  public async SignIn(@Body() data: LoginUserInput, @Req() req: Request) {
    return await this.authService.SignIn(data, req.ip);
  }
}
