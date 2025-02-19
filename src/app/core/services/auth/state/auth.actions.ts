import { HttpErrorResponse } from '@angular/common/http';

import { AuthApiResult, LoginRequestBody } from './auth.model';

export class Authenticate {
  static readonly type = '[Authenticate] Get Data';

  constructor(public readonly body: LoginRequestBody) {}
}

export class AuthenticateSuccess {
  static readonly type = '[Authenticate] Get Data Success';

  constructor(public readonly apiResult: AuthApiResult) {}
}

export class AuthenticateFailed {
  static readonly type = '[Authenticate] Get Data Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
