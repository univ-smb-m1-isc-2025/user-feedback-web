import { HttpErrorResponse } from '@angular/common/http';

import {
  FeedbackCreateApiResult,
  FeedbackCreateBody,
} from './feedback-create.models';

export class CreateFeedback {
  static readonly type = '[Feedbacks] Create Feedback';

  constructor(
    public readonly body: FeedbackCreateBody,
    public readonly groupId: number,
  ) {}
}

export class CreateFeedbackSuccess {
  static readonly type = '[Feedbacks] Create Feedback Success';

  constructor(
    public readonly apiResult: FeedbackCreateApiResult,
    public readonly groupId: number,
  ) {}
}

export class CreateFeedbackFailed {
  static readonly type = '[Feedbacks] Create Feedback Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
