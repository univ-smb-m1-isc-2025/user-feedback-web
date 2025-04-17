import { HttpErrorResponse } from '@angular/common/http';

export class NotifySuccess {
  static readonly type = '[Notification] Success';

  constructor(public readonly message: string) {}
}

export class NotifyError {
  static readonly type = '[Notification] Error';

  constructor(
    public readonly message: string,
    public readonly error?: HttpErrorResponse,
  ) {}
}
