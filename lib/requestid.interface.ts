import { ClsStore } from 'nestjs-cls';
import { RequestIdFormatType } from './requestid.enum';

export interface RequestIdDataStore extends ClsStore {
  requestId: string;
  type: RequestIdFormatType;
  length: number;
}

export type RequestIdModuleOptions = {
  type?: RequestIdFormatType;
  length?: number;
};
