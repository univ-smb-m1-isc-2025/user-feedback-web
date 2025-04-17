export class OpenDeleteFeedbackDialog {
  static readonly type = '[Feedbacks] Open Delete Feedback Dialog';

  constructor(public readonly feedbackId: number) {}
}

export class CloseDeleteFeedbackDialog {
  static readonly type = '[Feedbacks] Close Delete Feedback Dialog';
}
