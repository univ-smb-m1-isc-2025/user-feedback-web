import { ApiStatus } from 'uf/shared/models';

export interface FeedbackListStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: {
    data: Feedback[];
  };
}

export interface Feedback {
  id: number;
  title: string;
  description: string;
}
