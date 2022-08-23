import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './app/filter/all-exception.filter';
import { ResponseInterceptor } from './app/interceptor/response.interceptor';
import { AppLoggerMiddleware } from './app/middleware/app-log.middleware';
import { RequestMiddleware } from './app/middleware/request.middleware';
import { AuthModule } from './auth/auth.module';
import { NetworkModule } from './network/network.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, NetworkModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
