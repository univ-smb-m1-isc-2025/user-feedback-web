import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import {
  authApiResultMock,
  loginRequestBodyMock,
} from 'uf/testing/mock/auth.mock';
import { provideHttpTesting } from 'uf/testing/providers';

import { AuthService } from './auth.service';
import { AuthState } from './auth.state';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpTesting(), provideStore([AuthState])],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and get authentication data', (done) => {
    service.authenticate(loginRequestBodyMock).subscribe({
      next: (data) => {
        expect(data).toEqual(authApiResultMock);
        done();
      },
      error: jest.fn(),
    });

    const req = httpTestingController.expectOne('/auth/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toStrictEqual(loginRequestBodyMock);
    req.flush(authApiResultMock);
  });
});
