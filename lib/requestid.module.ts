import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { REQUEST_ID_TOKEN } from './requestid.constants';
import { ConfigurableModuleClass } from './requestid.module-definition';
import { RequestIdMiddleware } from './requestid.middleware';
import { RequestIdService } from './requestid.service';

const requestIdServiceProvider = {
  provide: REQUEST_ID_TOKEN,
  useClass: RequestIdService,
};

@Global()
@Module({
  imports: [ClsModule.forFeature()],
  providers: [requestIdServiceProvider],
  exports: [requestIdServiceProvider],
})
export class RequestIdModule extends ConfigurableModuleClass {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
