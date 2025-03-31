import { ApiStatus } from 'uf/shared/models';

export interface CreateCommentStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: CreateCommentApiResult | undefined;
}

export interface CreateCommentApiResult {
  id: number;
  description: string;
  parentFeedbackId: number;
}
