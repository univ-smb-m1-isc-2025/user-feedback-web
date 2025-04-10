import {
  AuthApiResult,
  AuthStateModel,
  LoginRequestBody,
} from 'uf/core/services/auth/state';

export const authApiResultMock: AuthApiResult = {
  type: 'bearer',
  token: 'json.web.token',
  refreshToken: 'json.web.refreshToken',
  user: {
    role: 'user',
    username: 'guigui',
    id: 123,
    email: 'guigui@gmail.com',
    feedbackCount: 1,
    groupCount: 0,
  }
};

export const authStateMock: AuthStateModel = {
  apiStatus: 'success',
  apiResult: authApiResultMock,
};

export const loginRequestBodyMock: LoginRequestBody = {
  username: 'guigui',
  password: 'mdp123',
};
