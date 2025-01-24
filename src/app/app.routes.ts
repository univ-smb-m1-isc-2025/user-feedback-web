import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home').then(
        (component) => component.HomeLayoutComponent,
      ),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./modules/error/page-error-not-found').then(
        (module) => module.PageErrorNotFoundComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
