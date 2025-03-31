import { HttpErrorResponse } from '@angular/common/http';
import { CreateCommentApiResult } from 'uf/modules/feedbacks/comment/state/comment.models';
import { Feedback } from 'uf/modules/feedbacks/list/data-access/state';

export class PostComment {
  static readonly type = '[Comments] Post Comment';

  constructor(public readonly feedbackId: number, public readonly description: string) {}
}

export class PostCommentSuccess {
  static readonly type = '[Comments] Post Comment Success';

  constructor(public readonly apiResult: CreateCommentApiResult, public readonly feedbackId: number) {}
}

export class PostCommentFailed {
  static readonly type = '[Comments] Post Comment Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
