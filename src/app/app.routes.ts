import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users').then((children) => children.usersRoutes),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./modules/error/page-error-not-found').then(
        (module) => module.PageErrorNotFoundComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./modules/layout').then(
        (component) => component.AppLayoutComponent,
      ),
    children: [
      {
        path: 'groups',
        loadChildren: () =>
          import('./modules/groups').then((children) => children.groupRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
