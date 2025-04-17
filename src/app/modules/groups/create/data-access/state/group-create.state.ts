import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';

import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';

import { groupDetailsActions } from 'uf/modules/groups/details';
import { groupId } from 'uf/shared/data-access/router';

import * as groupCreateActions from './group-create.actions';
import {
  GroupCreateApiResult,
  GroupCreateStateModel,
} from './group-create.models';
import { GroupCreateService } from './group-create.service';
import { groupListActions } from '../../../list/data-access/state';

export const initialState: GroupCreateStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<GroupCreateStateModel>({
  name: 'groupCreate',
  defaults: initialState,
})
@Injectable()
export class GroupCreateState {
  readonly #groupCreateService = inject(GroupCreateService);
  readonly #store = inject(Store);

  @Action(groupCreateActions.CreateGroup)
  createGroup(
    context: StateContext<GroupCreateStateModel>,
    { body, parentGroupId }: groupCreateActions.CreateGroup,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupCreateService.createGroup(body, parentGroupId).pipe(
      mergeMap((apiResult: GroupCreateApiResult) => {
        return context.dispatch(
          new groupCreateActions.CreateGroupSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new groupCreateActions.CreateGroupFailed(error),
        );
      }),
    );
  }

  @Action(groupCreateActions.CreateGroupSuccess)
  createGroupSuccess(
    context: StateContext<GroupCreateStateModel>,
    { apiResult }: groupCreateActions.CreateGroupSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult,
      }),
    );

    context.dispatch([
      new NotifySuccess('Groupe ajouté avec succès'),
      new groupListActions.GetGroupList(),
    ]);

    const group = this.#store.selectSnapshot(groupId);
    context.dispatch(new groupDetailsActions.GetGroupDetails(group));
  }

  @Action(groupCreateActions.CreateGroupFailed)
  createGroupFailed(context: StateContext<GroupCreateStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le groupe n'a pas pu être ajouté"));
  }
}
