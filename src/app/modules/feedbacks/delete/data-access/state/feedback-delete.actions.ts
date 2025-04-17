import { HttpErrorResponse } from '@angular/common/http';

export class DeleteFeedback {
  static readonly type = '[Feedbacks] Delete Feedback';

  constructor(public readonly feedbackId: number) {}
}

export class DeleteFeedbackSuccess {
  static readonly type = '[Feedbacks] Delete Feedback Success';
}

export class DeleteFeedbackFailed {
  static readonly type = '[Feedbacks] Delete Feedback Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
