import { AuthService } from './auth.service';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectConfig()
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('auth.JWT_SECRET'),
    });
  }

  public async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
