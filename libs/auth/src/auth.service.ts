import {
  Injectable,
  OnApplicationBootstrap,
  Logger,
  BadRequestException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './auth.entity'
import { Repository } from 'typeorm'
import { LoginUserInput } from './auth.dto'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private logger: Logger
  constructor(
    private readonly conf: ConfigService,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name)
  }

  async onApplicationBootstrap() {
    if ((await this.repo.count()) === 0) {
      const user = await this.repo.save(
        this.repo.create({
          lastIp: '127.0.0.1',
          lastTime: new Date(),
          name: this.conf.get('WEBSITE_NAME') ?? 'admin',
          password: this.conf.get('WEBSITE_PASSWORD') ?? 'admin',
          email: this.conf.get('WEBSITE_EMAIL') ?? 'admin@admin.admin',
        }),
      )
      this.logger.debug({ user })
    }
  }

  public async SignIn(data: LoginUserInput, ip: string) {
    const name = await this.repo.findOne({
      name: data.name,
    })
    if (!name) {
      throw new BadRequestException('该用户不存在')
    }
    if (!compareSync(data.password, name.password)) {
      throw new BadRequestException('密码不正确')
    }
    name.lastIp = ip
    name.lastTime = new Date()
    await this.repo.save(name)
    return {
      accessToken: this.jwtService.sign(
        {
          email: name.email,
        },
        {
          issuer: 'lee',
          jwtid: name.id,
        },
      ),
      tokenType: 'bearer',
      expiresIn: this.conf.get('JWT_EXPIRES_IN'),
      User: name,
    }
  }

  /**
   * @description 验证用户信息
   * @author lee
   * @date 2020-01-18
   * @param {*} payload
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async validateUser(payload: any): Promise<User> {
    return await this.repo.findOne({ email: payload.email })
  }
}
