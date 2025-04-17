import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { CommentState } from 'uf/modules/feedbacks/comment/state';
import {
  FeedbackCreateState,
  FeedbackCreateUiState,
} from 'uf/modules/feedbacks/create/data-access/state';
import {
  FeedbackDeleteState,
  FeedbackDeleteUiState,
} from 'uf/modules/feedbacks/delete/data-access/state';
import { LikeState } from 'uf/modules/feedbacks/like';
import { FeedbackListState } from 'uf/modules/feedbacks/list/data-access/state';

import {
  FeedbackUpdateState,
  FeedbackUpdateUiState,
} from 'uf/modules/feedbacks/update/data-access/state';

import { GroupUserListUiState } from 'uf/modules/groups/user-list/data-access';

import {
  GroupAddUserUiState,
  GroupAddUserState,
} from './add-user/data-access/state';
import {
  GroupCreateState,
  GroupCreateUiState,
} from './create/data-access/state';
import { GroupDeleteState } from './delete/state';
import { GroupDetailsState } from './details';
import { GroupLayoutComponent } from './layout';
import { GroupListState } from './list/data-access/state';
import { GroupNotJoinedListState } from './not-joined-list/state';
import { GroupUserRemoveState } from './user-list/data-access/group-user-remove.state';

export const groupRoutes: Routes = [
  {
    path: '',
    component: GroupLayoutComponent,
    providers: [provideStates([GroupDetailsState, GroupUserRemoveState])],
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
            GroupNotJoinedListState,
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
            FeedbackUpdateState,
            FeedbackUpdateUiState,
            FeedbackDeleteState,
            FeedbackDeleteUiState,
            GroupUserListUiState,
            GroupAddUserUiState,
            GroupAddUserState,
          ]),
        ],
      },
    ],
  },
];
