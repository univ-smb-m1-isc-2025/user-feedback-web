import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { CommentState } from 'uf/modules/feedbacks/comment/state';
import {
  FeedbackCreateState,
  FeedbackCreateUiState,
} from 'uf/modules/feedbacks/create/data-access/state';
import { LikeState } from 'uf/modules/feedbacks/like';
import { FeedbackListState } from 'uf/modules/feedbacks/list/data-access/state';

import {
  GroupCreateState,
  GroupCreateUiState,
} from './create/data-access/state';
import { GroupDeleteState } from './delete/state';
import { GroupLayoutComponent } from './layout';
import { GroupListState } from './list/data-access/state';

export const groupRoutes: Routes = [
  {
    path: '',
    component: GroupLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./list/containers').then(
            (component) => component.GroupListComponent,
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
        path: ':groupId',
        loadComponent: () =>
          import('uf/modules/feedbacks/list/containers').then(
            (component) => component.FeedbackListComponent,
          ),
        providers: [
          provideStates([
            FeedbackListState,
            FeedbackCreateState,
            FeedbackCreateUiState,
            CommentState,
            LikeState,
          ]),
        ],
      },
    ],
  },
];
