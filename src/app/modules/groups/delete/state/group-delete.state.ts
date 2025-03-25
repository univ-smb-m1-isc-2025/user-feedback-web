import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';

import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';

import * as groupDeleteActions from './group-delete.actions';
import { GroupDeleteStateModel } from './group-delete.models';
import { GroupDeleteService } from './group-delete.service';
import { groupListActions } from '../../list/data-access/state';

export const initialState: GroupDeleteStateModel = {
  apiStatus: undefined,
};

@State<GroupDeleteStateModel>({
  name: 'groupDelete',
  defaults: initialState,
})
@Injectable()
export class GroupDeleteState {
  readonly #groupDeleteService = inject(GroupDeleteService);

  @Action(groupDeleteActions.DeleteGroup)
  createGroup(
    context: StateContext<GroupDeleteStateModel>,
    { groupId }: groupDeleteActions.DeleteGroup,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupDeleteService.deleteGroup(groupId).pipe(
      mergeMap(() => {
        return context.dispatch(new groupDeleteActions.DeleteGroupSuccess());
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new groupDeleteActions.DeleteGroupFailed(error),
        );
      }),
    );
  }

  @Action(groupDeleteActions.DeleteGroupSuccess)
  createGroupSuccess(context: StateContext<GroupDeleteStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'success',
      }),
    );

    context.dispatch([
      new NotifySuccess('Groupe créé avec succès'),
      new groupListActions.GetGroupList(),
    ]);
  }

  @Action(groupDeleteActions.DeleteGroupFailed)
  createGroupFailed(context: StateContext<GroupDeleteStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le groupe n'a pas pu être supprimé"));
  }
}
