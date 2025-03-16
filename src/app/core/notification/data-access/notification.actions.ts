export class NotifySuccess {
  static readonly type = '[Notification] Notify Success';

  constructor(public message: string) {}
}

export class NotifyError {
  static readonly type = '[Notification] Notify Error';

  constructor(public message: string) {}
}
