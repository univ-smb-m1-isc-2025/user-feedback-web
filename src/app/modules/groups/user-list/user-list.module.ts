import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { GroupUserListUiState } from './data-access/group-user-list-ui.state';
import { GroupUserRemoveState } from './data-access/group-user-remove.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([GroupUserRemoveState, GroupUserListUiState]),
  ],
})
export class GroupUserListModule {}
