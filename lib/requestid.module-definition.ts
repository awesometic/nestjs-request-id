import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RequestIdModuleOptions } from './requestid.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RequestIdModuleOptions>().build();
