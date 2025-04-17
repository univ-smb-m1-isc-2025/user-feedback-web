import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { GroupUserRemoveState } from './user-list/data-access/group-user-remove.state';

@NgModule({
  imports: [
    NgxsModule.forFeature([
      // autres états...
      GroupUserRemoveState,
    ]),
  ],
})
export class GroupModule {}
