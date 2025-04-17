import { HttpErrorResponse } from '@angular/common/http';
import { Feedback } from 'uf/modules/feedbacks/list/data-access/state';

import {
  FeedbackCreateApiResult,
  FeedbackCreateBody,
} from './feedback-update.models';

export class UpdateFeedback {
  static readonly type = '[Feedbacks] Update Feedback';

  constructor(
    public readonly feedback: Feedback,
    public readonly body: FeedbackCreateBody,
  ) {}
}

export class UpdateFeedbackSuccess {
  static readonly type = '[Feedbacks] Update Feedback Success';

  constructor(
    public readonly feedbackId: number,
    public readonly apiResult: FeedbackCreateApiResult,
  ) {}
}

export class UpdateFeedbackFailed {
  static readonly type = '[Feedbacks] Update Feedback Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
