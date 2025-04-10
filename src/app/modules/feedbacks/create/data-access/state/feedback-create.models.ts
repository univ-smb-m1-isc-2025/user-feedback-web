import { User } from 'uf/core/services/auth/state';
import { ApiStatus } from 'uf/shared/models';

export interface FeedbackCreateStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: FeedbackCreateApiResult | undefined;
}

export interface FeedbackCreateApiResult {
  id: number;
  title: string;
  description: string;
  groupID: number;
  commentCount: number;
  user: User;
}

export interface FeedbackCreateBody {
  title: string;
  description: string;
}
