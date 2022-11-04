import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestIdFormatType } from './requestid.enum';
import { REQUEST_ID_HEADER } from './requestid.constants';
import { RequestIdModuleOptions } from './requestid.interface';

@Injectable()
export class RequestIdService {
  constructor(
    private readonly options: RequestIdModuleOptions,
    private readonly request: Request,
  ) {}

  get requestIdType() {
    // By default, it will use UUID v4 method to generate request IDs
    return this.options.type ?? RequestIdFormatType.UUID_V4;
  }

  get requestId() {
    return this.request.headers[REQUEST_ID_HEADER];
  }
}
