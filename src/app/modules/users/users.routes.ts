import { Routes } from '@angular/router';

import { UsersLayoutComponent } from './layout';

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
    ],
  },
];
