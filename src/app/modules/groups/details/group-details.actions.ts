import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'uf/core/services/auth/state';

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

export class GetSubgroups {
  static readonly type = '[Groups] Get Subgroups';

  constructor(public readonly groupId: number) {}
}

export class GetSubgroupsSuccess {
  static readonly type = '[Groups] Get Subgroups Success';

  constructor(public readonly apiResult: Group[]) {}
}

export class GetSubgroupsFailed {
  static readonly type = '[Groups] Get Subgroups Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class GetUsers {
  static readonly type = '[Groups] Get Users';

  constructor(public readonly groupId: number) {}
}

export class GetUsersSuccess {
  static readonly type = '[Groups] Get Users Success';

  constructor(public readonly apiResult: User[]) {}
}

export class GetUsersFailed {
  static readonly type = '[Groups] Get Users Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}

export class GroupDetailsResetState {
  static readonly type = '[Groups] Group Details Reset State';
}
