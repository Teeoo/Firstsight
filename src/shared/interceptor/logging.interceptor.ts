import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    if (req) {
      const method = req.method;
      const url = req.url;
      return next.handle().pipe(
        tap(
          () => {
            new Logger(`RESTful:${context.getClass().name}`).log(
              `来源 ip:${
                req.ip
              } 请求方法:${method} 请求路径:${url} 处理成功 耗时:${Date.now() -
                now} ms`,
            );
          },
          () => {
            new Logger(`RESTful:${context.getClass().name}`).error(
              `来源 ip:${
                req.ip
              } 请求方法:${method} 请求路径:${url} 处理失败 耗时:${Date.now() -
                now} ms`,
            );
          },
        ),
      );
    } else {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();

      let parentType: string;
      if (info.parentType.name === 'Query') {
        parentType = '(Query)查询';
      } else if (info.parentType.name === 'Mutation') {
        parentType = '(Mutation)变更';
      } else {
        parentType = '(Subscription)订阅';
      }
      return next.handle().pipe(
        tap(
          () => {
            new Logger(`GraphQL:${context.getClass().name}`).log(
              `${
                ctx.getContext().req
                  ? `来源 ip: ${ctx.getContext().req.ip}`
                  : '订阅模式'
              } 执行操作: ${parentType} 处理函数: ${context.getClass().name}/${
                info.fieldName
              } 处理成功 耗时:${Date.now() - now} ms`,
            );
          },
          () => {
            new Logger(`GraphQL:${context.getClass().name}`).error(
              `${
                ctx.getContext().req
                  ? `来源 ip: ${ctx.getContext().req.ip}`
                  : '订阅模式'
              } 执行操作: ${parentType} 处理函数: ${context.getClass().name}/${
                info.fieldName
              } 处理失败 耗时:${Date.now() - now} ms`,
            );
          },
        ),
      );
    }
  }
}
