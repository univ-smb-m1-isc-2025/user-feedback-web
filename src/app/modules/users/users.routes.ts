import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';

import { UsersLayoutComponent } from './layout';
import { UserSignUpState } from './sign-up/data-access/state';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./sign-in').then(
            (component) => component.UsersSignInPageComponent,
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/containers').then(
            (component) => component.UsersSignUpPageComponent,
          ),
        providers: [provideStates([UserSignUpState])],
      },
    ],
  },
];
