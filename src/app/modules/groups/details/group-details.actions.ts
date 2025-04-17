import { HttpErrorResponse } from '@angular/common/http';

import { Group } from '../list/data-access/state';

export class GetGroupDetails {
  static readonly type = '[Groups] Get Group Details';

  constructor(public readonly groupId: number) {}
}

export class GetGroupDetailsSuccess {
  static readonly type = '[Groups] Get Group Details Success';

  constructor(public readonly apiResult: Group) {}
}

export class GetGroupDetailsFailed {
  static readonly type = '[Groups] Get Group Details Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class GroupDetailsResetState {
  static readonly type = '[Groups] Group Details Reset State';
}
