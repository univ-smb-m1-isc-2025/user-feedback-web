import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import {
  authApiResultMock,
  loginRequestBodyMock,
} from 'uf/testing/mock/auth.mock';
import { provideHttpTesting } from 'uf/testing/providers';

import * as authActions from './auth.actions';
import { AuthService } from './auth.service';
import { AuthState, initialState } from './auth.state';

describe('AuthState', () => {
  let store: Store;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([AuthState]), provideHttpTesting()],
    });

    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
  });

  it('should init state', () => {
    const authState = store.selectSnapshot((state) => state.auth);

    expect(authState).toEqual(initialState);
  });

  it('should get api result and update api status to `success` when `authActions.Authenticate` success', () => {
    const apiResponse = of(authApiResultMock);

    service.authenticate = jest.fn(() => apiResponse);
    store.dispatch(new authActions.Authenticate(loginRequestBodyMock));

    const apiResult = store.selectSnapshot((state) => state.auth.apiResult);
    expect(apiResult).toEqual(authApiResultMock);

    const apiStatus = store.selectSnapshot((state) => state.auth.apiStatus);
    expect(apiStatus).toBe('success');
  });

  it('should update api status to `failure` when `authActions.Authenticate` failed', () => {
    const apiResponse = throwError(() => 'error');

    service.authenticate = jest.fn(() => apiResponse);
    store.dispatch(new authActions.Authenticate(loginRequestBodyMock));

    const apiStatus = store.selectSnapshot((state) => state.auth.apiStatus);
    expect(apiStatus).toBe('failure');
  });
});
