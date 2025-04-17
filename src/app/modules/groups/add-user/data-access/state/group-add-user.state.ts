import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, mergeMap, Observable } from 'rxjs';

import {
  NotifyError,
  NotifySuccess,
} from 'uf/core/notification/data-access/notification.actions';

import * as groupAddUserActions from './group-add-user.actions';
import { GroupAddUserStateModel } from './group-add-user.models';
import { GroupAddUserService } from './group-add-user.service';

export const initialState: GroupAddUserStateModel = {
  apiStatus: undefined,
  searchResults: [],
  addUserStatus: undefined,
};

@State<GroupAddUserStateModel>({
  name: 'groupAddUser',
  defaults: initialState,
})
@Injectable()
export class GroupAddUserState {
  readonly #groupAddUserService = inject(GroupAddUserService);

  @Action(groupAddUserActions.SearchUsers)
  searchUsers(
    ctx: StateContext<GroupAddUserStateModel>,
    action: groupAddUserActions.SearchUsers,
  ): Observable<void> {
    ctx.patchState({
      apiStatus: 'loading',
    });

    // Utiliser également le groupId
    return this.#groupAddUserService
      .searchUsers(action.searchTerm, action.groupId)
      .pipe(
        mergeMap((users) => {
          return ctx.dispatch(
            new groupAddUserActions.SearchUsersSuccess(users),
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return ctx.dispatch(new groupAddUserActions.SearchUsersFailed(error));
        }),
      );
  }

  @Action(groupAddUserActions.SearchUsersSuccess)
  searchUsersSuccess(
    ctx: StateContext<GroupAddUserStateModel>,
    action: groupAddUserActions.SearchUsersSuccess,
  ): void {
    ctx.patchState({
      apiStatus: 'success',
      searchResults: action.users,
    });
  }

  @Action(groupAddUserActions.SearchUsersFailed)
  searchUsersFailed(
    ctx: StateContext<GroupAddUserStateModel>,
    action: groupAddUserActions.SearchUsersFailed,
  ): void {
    ctx.patchState({
      apiStatus: 'error',
    });
    ctx.dispatch(
      new NotifyError(
        'Erreur lors de la recherche des utilisateurs',
        action.error,
      ),
    );
  }

  @Action(groupAddUserActions.AddUserToGroup)
  addUserToGroup(
    ctx: StateContext<GroupAddUserStateModel>,
    action: groupAddUserActions.AddUserToGroup,
  ): Observable<void> {
    ctx.patchState({
      addUserStatus: 'loading',
    });

    return this.#groupAddUserService
      .addUserToGroup(action.groupId, action.userId)
      .pipe(
        mergeMap((response) => {
          return ctx.dispatch(
            new groupAddUserActions.AddUserToGroupSuccess(response),
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return ctx.dispatch(
            new groupAddUserActions.AddUserToGroupFailed(error),
          );
        }),
      );
  }

  @Action(groupAddUserActions.AddUserToGroupSuccess)
  addUserToGroupSuccess(ctx: StateContext<GroupAddUserStateModel>): void {
    ctx.patchState({
      addUserStatus: 'success',
    });
    ctx.dispatch(new NotifySuccess('Utilisateur ajouté au groupe avec succès'));
  }

  @Action(groupAddUserActions.AddUserToGroupFailed)
  addUserToGroupFailed(
    ctx: StateContext<GroupAddUserStateModel>,
    action: groupAddUserActions.AddUserToGroupFailed,
  ): void {
    ctx.patchState({
      addUserStatus: 'error',
    });
    ctx.dispatch(
      new NotifyError(
        "Erreur lors de l'ajout de l'utilisateur au groupe",
        action.error,
      ),
    );
  }

  @Action(groupAddUserActions.ResetAddUserState)
  resetAddUserState(ctx: StateContext<GroupAddUserStateModel>): void {
    ctx.setState(initialState);
  }
}
