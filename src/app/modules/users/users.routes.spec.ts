import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { usersRoutes } from './users.routes';

describe('Users Routes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(usersRoutes)],
    });

    router = TestBed.inject(Router);
  });

  it('should navigate to `/sign-in`', fakeAsync(() => {
    router.navigate(['/', 'sign-in']);
    tick();
    expect(router.url).toBe('/sign-in');
  }));

  it('not match', fakeAsync(() => {
    const navigate = (): void => {
      router.navigate(['/', 'not', 'exists']);
      tick();
    };
    expect(() => navigate()).toThrow();
  }));
});
