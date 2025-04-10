export class LikeFeedback {
  static readonly type = '[Feedbacks] Like Feedback';

  constructor(
    public readonly feedbackId: number,
    public readonly groupId: number,
    public readonly likeOrDislike: boolean,
  ) {}
}

export class LikeComment {
  static readonly type = '[Feedbacks] Like Comment';

  constructor(
    public readonly commentId: number,
    public readonly feedbackId: number,
    public readonly likeOrDislike: boolean,
  ) {}
}
