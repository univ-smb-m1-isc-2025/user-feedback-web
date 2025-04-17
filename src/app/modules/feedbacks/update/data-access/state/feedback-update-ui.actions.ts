import { Feedback } from 'uf/modules/feedbacks/list/data-access/state';

export class OpenUpdateFeedbackDialog {
  static readonly type = '[Feedbacks] Open Update Feedback Dialog';

  constructor(public readonly feedback: Feedback) {}
}

export class CloseUpdateFeedbackDialog {
  static readonly type = '[Feedbacks] Close Update Feedback Dialog';
}
