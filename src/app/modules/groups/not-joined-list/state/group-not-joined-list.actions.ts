import { HttpErrorResponse } from '@angular/common/http';

import { Group } from '../../list/data-access/state';

export class GetGroupNotJoinedList {
  static readonly type = '[Groups] Get Group Not Joined List';
}

export class GetGroupNotJoinedListSuccess {
  static readonly type = '[Groups] Get Group Not Joined List Success';

  constructor(public readonly apiResult: Group[]) {}
}

export class GetGroupNotJoinedListFailed {
  static readonly type = '[Groups] Get Group Not Joined List Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
