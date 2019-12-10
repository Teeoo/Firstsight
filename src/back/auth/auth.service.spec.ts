import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entity/user.entity';
import { ConfigService, ConfigModule } from 'nestjs-config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import * as path from 'path';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, 'config/**/!(*.d).{ts,js}'), {
          modifyConfigName: name => name.replace('.config', ''),
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (conf: ConfigService) => conf.get('database'),
          inject: [ConfigService],
        }),
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
      providers: [
        AuthService,
        AuthStrategy,
        {
          provide: User,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
