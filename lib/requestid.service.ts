import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  RequestIdModuleOptions,
  RequestIdDataStore,
} from './requestid.interface';

@Injectable()
export class RequestIdService {
  constructor(private readonly clsService: ClsService<RequestIdDataStore>) {
    this.clsService.enter();
  }

  get requestId() {
    return this.clsService.get().requestId;
  }

  set requestId(value: string) {
    this.clsService.set('requestId', value);
  }

  get requestIdType() {
    return this.clsService.get().type;
  }

  set requestIdType(value: RequestIdModuleOptions['type']) {
    this.clsService.set('type', value);
  }

  get requestIdLength() {
    return this.clsService.get().length;
  }

  set requestIdLength(value: RequestIdModuleOptions['length']) {
    this.clsService.set('length', value);
  }
}
