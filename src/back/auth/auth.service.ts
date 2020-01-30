import {
  Injectable,
  Logger,
  BadRequestException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/databases/entity/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { NewUserInput, LoginUserInput } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  /**
   * @description Logger
   * @private
   * @type {Logger}
   * @memberof AuthService
   */
  private logger: Logger;

  /**
   * Creates an instance of AuthService.
   * @author lee
   * @date 2020-01-18
   * @param {Repository<User>} repo
   * @param {JwtService} jwtService
   * @param {ConfigService} conf
   * @memberof AuthService
   */
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly conf: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * @description 登陆
   * @author lee
   * @date 2020-01-18
   * @param {LoginUserInput} data
   * @param {string} ip
   * @returns
   * @memberof AuthService
   */
  public async SignIn(data: LoginUserInput, ip: string) {
    const name = await this.repo.findOne({
      name: data.name,
    });
    if (!name) {
      throw new BadRequestException('该用户不存在');
    }
    if (!compareSync(data.password, name.password)) {
      throw new BadRequestException('密码不正确');
    }
    name.lastIp = ip;
    name.lastTime = new Date();
    await this.repo.save(name);
    return {
      accessToken: this.jwtService.sign(
        {
          nick_name: name.name,
          email: name.email,
        },
        {
          issuer: 'lee',
          jwtid: name.id,
        },
      ),
      tokenType: 'bearer',
      expiresIn: this.conf.get('JWT_EXPIRESIN'),
      User: name,
    };
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
    return await this.repo.findOne({ name: payload.nick_name });
  }
}
