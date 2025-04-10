import { HttpErrorResponse } from '@angular/common/http';

import { RegisterRequestBody } from './user-sign-up.models';

export class Register {
  static readonly type = '[Authenticate] Register User';

  constructor(public readonly body: RegisterRequestBody) {}
}

export class RegisterSuccess {
  static readonly type = '[Authenticate] Register User Success';
}

export class RegisterFailed {
  static readonly type = '[Authenticate] Register User Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
