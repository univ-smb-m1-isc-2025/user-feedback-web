import { HttpErrorResponse } from '@angular/common/http';

import { AuthApiResult, LoginRequestBody } from './auth.model';

export class Authenticate {
  static readonly type = '[Authenticate] Authenticate User';

  constructor(public readonly body: LoginRequestBody) {}
}

export class AuthenticateSuccess {
  static readonly type = '[Authenticate] Authenticate User Success';

  constructor(public readonly apiResult: AuthApiResult) {}
}

export class AuthenticateFailed {
  static readonly type = '[Authenticate] Authenticate User Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
