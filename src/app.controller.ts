import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
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
  @Get('article')
  public async article(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('query') query?: any,
    @Query('sort') sort?: any,
  ) {
    return await this.appService.article(page, limit);
  }
}
