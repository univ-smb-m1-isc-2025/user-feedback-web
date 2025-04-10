import { ApiStatus } from 'uf/shared/models';

export interface AuthStateModel {
  apiStatus: ApiStatus | undefined;
  apiResult: AuthApiResult | undefined;
}

export interface AuthApiResult extends TokenApiResult {
  refreshToken: string;
  user: User;
}

export interface TokenApiResult {
  type: string;
  token: string;
}

export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  groupCount: number;
  feedbackCount: number;
}
