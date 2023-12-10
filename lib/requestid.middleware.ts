import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';
import { nanoid } from 'nanoid/async';
import { REQUEST_ID_HEADER, REQUEST_ID_TOKEN } from './requestid.constants';
import { RequestIdFormatType } from './requestid.enum';
import { RequestIdService } from './requestid.service';
import { RequestIdModuleOptions } from './requestid.interface';
import { MODULE_OPTIONS_TOKEN } from './requestid.module-definition';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly requestIdOptions: RequestIdModuleOptions,
    @Inject(REQUEST_ID_TOKEN)
    private readonly requestIdService: RequestIdService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the options for this package by user
    // If the user does not provide the options, use the default options
    const { type, length } = {
      type: this.requestIdOptions.type ?? RequestIdFormatType.UUID_V4,
      length: this.requestIdOptions.length ?? 21, // Default size for nanoid,
    };

    // Set the generated request ID to the request header
    let requestId: string;

    switch (type) {
      case RequestIdFormatType.RANDOM:
        requestId = await nanoid(length);
        break;
      case RequestIdFormatType.UUID_V1:
        requestId = uuid.v1();
        break;
      case RequestIdFormatType.UUID_V4:
        requestId = uuid.v4();
        break;
      default:
        // Throw an error if the given format type is not supported
        throw new Error(`Unsupported request ID format type: ${type}`);
    }

    req.headers[REQUEST_ID_HEADER] = requestId;
    res.setHeader(REQUEST_ID_HEADER, requestId);

    // Set the request ID to the CLS service
    this.requestIdService.requestId = req.headers[REQUEST_ID_HEADER];
    this.requestIdService.requestIdType = type;
    this.requestIdService.requestIdLength = length;

    next();
  }
}
