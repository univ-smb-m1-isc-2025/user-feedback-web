import { HttpErrorResponse } from '@angular/common/http';

import { Comment, Feedback } from './feedback-list.models';

export class GetFeedbackList {
  static readonly type = '[Feedbacks] Get Feedback List';

  constructor(public readonly groupId: number) {}
}

export class GetFeedbackListSuccess {
  static readonly type = '[Feedbacks] Get Feedback List Success';

  constructor(public readonly apiResult: Feedback[]) {}
}

export class GetFeedbackListFailed {
  static readonly type = '[Feedbacks] Get Feedback List Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class GetCommentList {
  static readonly type = '[Feedbacks] Get Comment List';

  constructor(public readonly feedbackId: number) {}
}

export class GetCommentListSuccess {
  static readonly type = '[Feedbacks] Get Comment List Success';

  constructor(
    public readonly apiResult: Comment[],
    public readonly feedbackId: number,
  ) {}
}

export class GetCommentListFailed {
  static readonly type = '[Feedbacks] Get Comment List Failed';

  constructor(
    public readonly error: HttpErrorResponse,
    public readonly feedbackId: number,
  ) {}
}
