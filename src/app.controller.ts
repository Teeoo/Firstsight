import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  public home(@Res() res: Response): object {
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: '愿你历尽千帆,归来仍是少年',
      result: {
        'GRAPHQL APIS': 'https://api.teeoo.cn/graphql',
        'RESTful API': 'https://api.teeoo.cn/',
      },
      github: 'https://github.com/Teeoo',
    });
  }
}
