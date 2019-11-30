import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConfig } from 'nestjs-config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInput, NewUserInput } from './auth.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private logger: Logger;

  /**
   * Creates an instance of AuthService.
   * @param {Repository<User>} repo
   * @param {JwtService} jwtService
   * @param {*} config
   * @memberof AuthService
   */
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectConfig() private readonly config: any,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * @description
   * @param {NewUserInput} data
   * @param {string} ip
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async SignUp(data: NewUserInput, ip: string): Promise<User> {
    const result = await this.repo.findOne({
      where: [
        {
          name: data.name,
        },
        {
          email: data.email,
        },
      ],
    });
    if (result) {
      throw new BadRequestException('用户名或者邮箱已经存在');
    }
    Object.assign(data, { lastIp: ip, lastTime: new Date() });
    return this.repo.save(this.repo.create(data));
  }

  /**
   * @description
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
      expiresIn: this.config.get('auth.JWT_EXPIRESIN'),
      User: name,
    };
  }

  /**
   * @description validate
   * @param {*} payload
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async validateUser(payload: any): Promise<User> {
    return await this.repo.findOne(
      { name: payload.nick_name },
      {
        cache: 24 * 60 * 60,
      },
    );
  }
}
