import { HttpErrorResponse } from '@angular/common/http';

export class RemoveUserFromGroup {
  static readonly type = '[Groups] Remove User From Group';

  constructor(
    public readonly groupId: number,
    public readonly userId: number,
  ) {}
}

export class RemoveUserFromGroupSuccess {
  static readonly type = '[Groups] Remove User From Group Success';

  constructor(
    public readonly userId: number,
    public readonly groupId: number,
  ) {}
}

export class RemoveUserFromGroupFailed {
  static readonly type = '[Groups] Remove User From Group Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
