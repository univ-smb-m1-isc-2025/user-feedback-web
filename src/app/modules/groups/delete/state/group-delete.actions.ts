import { HttpErrorResponse } from '@angular/common/http';

export class DeleteGroup {
  static readonly type = '[Groups] Delete Group';

  constructor(public readonly groupId: number) {}
}

export class DeleteGroupSuccess {
  static readonly type = '[Groups] Delete Group Success';
}

export class DeleteGroupFailed {
  static readonly type = '[Groups] Delete Group Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
