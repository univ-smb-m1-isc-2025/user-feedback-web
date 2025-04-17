import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, mergeMap, Observable } from 'rxjs';
import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';
import { groupDetailsActions } from 'uf/modules/groups/details';

import * as groupUserRemoveActions from './group-user-remove.actions';
import { GroupUserRemoveService } from './group-user-remove.service';

export interface GroupUserRemoveStateModel {
  removing: boolean;
  error: HttpErrorResponse | undefined;
}

const initialState: GroupUserRemoveStateModel = {
  removing: false,
  error: undefined,
};

@State<GroupUserRemoveStateModel>({
  name: 'groupUserRemove',
  defaults: initialState,
})
@Injectable()
export class GroupUserRemoveState {
  readonly #groupUserRemoveService = inject(GroupUserRemoveService);

  @Action(groupUserRemoveActions.RemoveUserFromGroup)
  removeUserFromGroup(
    ctx: StateContext<GroupUserRemoveStateModel>,
    action: groupUserRemoveActions.RemoveUserFromGroup,
  ): Observable<void> {
    ctx.patchState({
      removing: true,
      error: undefined,
    });

    return this.#groupUserRemoveService
      .removeUserFromGroup(action.groupId, action.userId)
      .pipe(
        mergeMap(() => {
          return ctx.dispatch(
            new groupUserRemoveActions.RemoveUserFromGroupSuccess(
              action.userId,
              action.groupId,
            ),
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return ctx.dispatch(
            new groupUserRemoveActions.RemoveUserFromGroupFailed(error),
          );
        }),
      );
  }

  @Action(groupUserRemoveActions.RemoveUserFromGroupSuccess)
  removeUserFromGroupSuccess(
    ctx: StateContext<GroupUserRemoveStateModel>,
    action: groupUserRemoveActions.RemoveUserFromGroupSuccess,
  ): void {
    ctx.patchState({
      removing: false,
    });

    ctx.dispatch([
      new NotifySuccess('Utilisateur retiré du groupe avec succès'),
      new groupDetailsActions.GetUsers(action.groupId), // Utiliser groupId de l'action
    ]);
  }

  @Action(groupUserRemoveActions.RemoveUserFromGroupFailed)
  removeUserFromGroupFailed(
    ctx: StateContext<GroupUserRemoveStateModel>,
    action: groupUserRemoveActions.RemoveUserFromGroupFailed,
  ): void {
    ctx.patchState({
      removing: false,
      error: action.error,
    });

    ctx.dispatch(
      new NotifyError("Erreur lors du retrait de l'utilisateur du groupe"),
    );
  }
}
