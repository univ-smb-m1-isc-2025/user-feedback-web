import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import {
  GroupCreateState,
  GroupCreateUiState,
} from 'uf/modules/groups/create/data-access/state';
import { GroupDeleteState } from 'uf/modules/groups/delete/state';
import { GroupListState } from 'uf/modules/groups/list/data-access/state';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home').then(
        (component) => component.HomeLayoutComponent,
      ),
    providers: [
      provideStates([
        GroupDeleteState,
        GroupCreateState,
        GroupCreateUiState,
        GroupListState,
      ]),
    ],
  },
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
    path: '**',
    redirectTo: 'error',
  },
];
