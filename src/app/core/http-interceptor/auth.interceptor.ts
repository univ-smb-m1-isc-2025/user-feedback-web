import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { token } from '../services/auth/queries';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  // allow authentication requests to pass through
  const authRegex = /^\/api\/auth\/.*/;
  if (authRegex.test(request.url)) {
    return next(request);
  }

  const store = inject(Store);
  const tokenSignal = store.selectSignal(token);
  const jwt = tokenSignal();

  if (jwt != '') {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` },
    });
  }

  return next(request);
};
