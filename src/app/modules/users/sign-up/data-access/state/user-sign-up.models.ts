import { ApiStatus } from 'uf/shared/models';

export interface UserSignUpStateModel {
  apiStatus: ApiStatus | undefined;
}

export interface RegisterRequestBody {
  username: string;
  password: string;
}
