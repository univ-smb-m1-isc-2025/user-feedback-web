import { inject, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';

import * as groupCreateUiActions from './group-create-ui.actions';
import * as groupCreateActions from './group-create.actions';
import { GroupCreateDialogComponent } from '../../containers';

@State<never>({
  name: 'groupCreateUi',
})
@Injectable()
export class GroupCreateUiState {
  readonly #dialog = inject(MatDialog);
  readonly #ngZone = inject(NgZone);

  #dialogRef!: MatDialogRef<GroupCreateDialogComponent>;

  @Action(groupCreateUiActions.OpenCreateGroupDialog)
  openCreateGroupDialog(
    _context: StateContext<GroupCreateDialogComponent>,
    { groupId }: groupCreateUiActions.OpenCreateGroupDialog,
  ): void {
    this.#ngZone.run(() => {
      this.#dialogRef = this.#dialog.open(GroupCreateDialogComponent, {
        data: { groupId },
      });
    });
  }

  @Action([
    groupCreateUiActions.CloseCreateGroupDialog,
    groupCreateActions.CreateGroupSuccess,
  ])
  closeCreateGroupDialog(): void {
    this.#ngZone.run(() => {
      void this.#dialogRef.close();
    });
  }
}
