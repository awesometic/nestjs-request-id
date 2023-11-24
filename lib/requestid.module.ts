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
import { RequestIdFormatType } from './requestid.enum';

const requestIdServiceProvider = {
  provide: REQUEST_ID_TOKEN,
  useFactory: (options: RequestIdModuleOptions, request: Request) =>
    new RequestIdService(
      {
        // Set default values for the options if they are not provided
        type: options?.type ?? RequestIdFormatType.UUID_V4,
        length: options?.length ?? 21, // Default size for nanoid,
      },
      request,
    ),
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
