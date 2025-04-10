import { HttpErrorResponse } from '@angular/common/http';

export class ChangeProfilePicture {
  static readonly type = '[User] Change Profile Picture';

  constructor(public readonly file: File) {}
}

export class ChangeProfilePictureSuccess {
  static readonly type = '[User] Change Profile Picture Success';
}

export class ChangeProfilePictureFailed {
  static readonly type = '[User] Change Profile Picture Failed';

  constructor(public readonly error: HttpErrorResponse) {}
}
