import { createSelector } from '@ngxs/store';
import { UfRoute } from 'uf/shared/data-access/router';

export const routeUsersSignIn = createSelector(
  [],
  (): UfRoute => ['/', 'users', 'sign-in'],
);
