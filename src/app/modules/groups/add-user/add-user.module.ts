import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { GroupAddUserUiState } from './data-access/state/group-add-user-ui.state';
import { GroupAddUserState } from './data-access/state/group-add-user.state';


@NgModule({
  imports: [
    NgxsModule.forFeature([
      GroupAddUserState,
      GroupAddUserUiState
    ])
  ]
})
export class GroupAddUserModule {}