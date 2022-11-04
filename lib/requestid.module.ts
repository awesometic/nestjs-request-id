import { Global, MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { REQUEST_ID_TOKEN } from './requestid.constants';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './requestid.module-definition';
import { RequestIdMiddleware } from './requestid.middleware';
import { RequestIdService } from './requestid.service';
import { RequestIdModuleOptions } from './requestid.interface';

const requestIdServiceProvider = {
  provide: REQUEST_ID_TOKEN,
  useFactory: (options: RequestIdModuleOptions, request: Request) =>
    new RequestIdService(options, request),
  inject: [MODULE_OPTIONS_TOKEN, REQUEST],
  scope: Scope.REQUEST,
};

@Global()
@Module({
  providers: [requestIdServiceProvider],
  exports: [requestIdServiceProvider],
})
export class RequestIdModule extends ConfigurableModuleClass {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
