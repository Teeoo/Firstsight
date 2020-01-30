import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, AuthStrategy],
})
export class AuthModule {}
