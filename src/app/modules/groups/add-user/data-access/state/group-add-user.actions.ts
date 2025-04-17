import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'uf/core/services/auth/state';

import { AddUserToGroupResponse } from './group-add-user.models';

export class SearchUsers {
  static readonly type = '[Groups] Search Users';
  
  constructor(
    public readonly searchTerm: string,
    public readonly groupId: number
  ) {}
}

export class SearchUsersSuccess {
  static readonly type = '[Groups] Search Users Success';
  
  constructor(public readonly users: User[]) {}
}

export class SearchUsersFailed {
  static readonly type = '[Groups] Search Users Failed';
  
  constructor(public readonly error: HttpErrorResponse) {}
}

export class AddUserToGroup {
  static readonly type = '[Groups] Add User To Group';
  
  constructor(
    public readonly groupId: number, 
    public readonly userId: number
  ) {}
}

export class AddUserToGroupSuccess {
  static readonly type = '[Groups] Add User To Group Success';
  
  constructor(public readonly response: AddUserToGroupResponse) {}
}

export class AddUserToGroupFailed {
  static readonly type = '[Groups] Add User To Group Failed';
  
  constructor(public readonly error: HttpErrorResponse) {}
}

export class ResetAddUserState {
  static readonly type = '[Groups] Reset Add User State';
}