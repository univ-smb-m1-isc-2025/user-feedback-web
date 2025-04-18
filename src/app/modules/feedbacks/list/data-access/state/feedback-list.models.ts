import { User } from 'uf/core/services/auth/state';
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
  isEdited: boolean;
  comment: Comment[];
  getCommentStatus: ApiStatus | undefined;
  stateLikeUser: LikeState;
}

export interface Comment {
  id: number;
  description: string;
  user: User;
  parentFeedbackId: number;
  likesCount: number;
  dislikesCount: number;
  isEdited: boolean;
  stateLikeUser: LikeState;
}

export type LikeState = -1 | 0 | 1;
