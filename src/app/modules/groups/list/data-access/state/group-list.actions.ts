import { HttpErrorResponse } from '@angular/common/http';

import { Group } from './group-list.models';

export class GetGroupList {
  static readonly type = '[Groups] Get Group List';
}

export class GetGroupListSuccess {
  static readonly type = '[Groups] Get Group List Success';

  constructor(public readonly apiResult: Group[]) {}
}

export class GetGroupListFailed {
  static readonly type = '[Groups] Get Group List Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
