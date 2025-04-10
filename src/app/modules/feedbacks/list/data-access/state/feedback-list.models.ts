import { User } from 'uf/modules/groups/list/data-access/state';
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
  user: User;
  groupID: number;
  commentCount: number;
  likesCount: number;
  dislikesCount: number;
  comment: Comment[];
  getCommentStatus: ApiStatus | undefined;
}

export interface Comment {
  id: number;
  description: string;
  user: User;
  parentFeedbackId: number;
  likesCount: number;
  dislikesCount: number;
}
