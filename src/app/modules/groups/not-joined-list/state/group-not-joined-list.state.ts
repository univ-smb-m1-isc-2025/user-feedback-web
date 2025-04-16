import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, Observable, switchMap } from 'rxjs';

import * as groupNotJoinedListActions from './group-not-joined-list.actions';
import { GroupNotJoinedListStateModel } from './group-not-joined-list.models';
import { GroupNotJoinedListService } from './group-not-joined-list.service';
import { Group } from '../../list/data-access/state';

export const initialState: GroupNotJoinedListStateModel = {
  apiStatus: undefined,
  apiResult: {
    data: [],
  },
};

@State<GroupNotJoinedListStateModel>({
  name: 'groupNotJoinedList',
  defaults: initialState,
})
@Injectable()
export class GroupNotJoinedListState {
  readonly #groupNotJoinedListService = inject(GroupNotJoinedListService);

  @Action(groupNotJoinedListActions.GetGroupNotJoinedList)
  getGroupNotJoinedList(context: StateContext<GroupNotJoinedListStateModel>): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupNotJoinedListService.getList().pipe(
      switchMap((apiResult: Group[]) => {
        return context.dispatch(
          new groupNotJoinedListActions.GetGroupNotJoinedListSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(new groupNotJoinedListActions.GetGroupNotJoinedListFailed(error));
      }),
    );
  }

  @Action(groupNotJoinedListActions.GetGroupNotJoinedListSuccess)
  getGroupNotJoinedListSuccess(
    context: StateContext<GroupNotJoinedListStateModel>,
    { apiResult }: groupNotJoinedListActions.GetGroupNotJoinedListSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult: patch({
          data: apiResult,
        }),
      }),
    );
  }

  @Action(groupNotJoinedListActions.GetGroupNotJoinedListFailed)
  getGroupNotJoinedListFailed(context: StateContext<GroupNotJoinedListStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }
}
