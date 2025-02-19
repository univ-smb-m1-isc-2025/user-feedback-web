import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { authInterceptor } from 'uf/core/http-interceptor/auth.interceptor';
import { AuthState } from 'uf/core/services/auth/state';
import { authStateMock } from 'uf/testing/mock/auth.mock';
import { provideHttpTesting } from 'uf/testing/providers';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideStore([AuthState]),
        provideHttpTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header if token exists', () => {
    store.reset({
      auth: authStateMock,
    });

    httpClient.get('/api/url').subscribe();
    const req = httpMock.expectOne('/api/url');

    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer json.web.token',
    );
  });
});
