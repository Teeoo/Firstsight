import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  public logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request = ctx.getRequest();
    if (request) {
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
      const error = {
        path: request.url,
        method: request.method,
        error: exception.message,
        ip: request.ip,
        timestamp: new Date().toISOString(),
      };
      this.logger.debug(error);
      response
        .status(status)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(error);
    } else {
      // const gqlHost = GqlArgumentsHost.create(host);
      // const gqlInfo = gqlHost.getInfo<GraphQLResolveInfo>();
      return exception;
    }
  }
}
