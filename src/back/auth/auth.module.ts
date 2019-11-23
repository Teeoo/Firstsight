import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('auth.JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('auth.JWT_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService],
  providers: [AuthService, AuthResolver, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
