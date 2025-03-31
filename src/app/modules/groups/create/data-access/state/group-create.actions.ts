import { HttpErrorResponse } from '@angular/common/http';

import { GroupCreateApiResult, GroupCreateBody } from './group-create.models';

export class CreateGroup {
  static readonly type = '[Groups] Create Group';

  constructor(public readonly body: GroupCreateBody) {}
}

export class CreateGroupSuccess {
  static readonly type = '[Groups] Create Group Success';

  constructor(public readonly apiResult: GroupCreateApiResult) {}
}

export class CreateGroupFailed {
  static readonly type = '[Groups] Create Group Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
