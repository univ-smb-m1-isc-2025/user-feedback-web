import { HttpErrorResponse } from '@angular/common/http';

import { Feedback } from './feedback-list.models';

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
