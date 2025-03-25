import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, Observable, switchMap } from 'rxjs';

import * as groupListActions from './group-list.actions';
import { Group, GroupListStateModel } from './group-list.models';
import { GroupListService } from './group-list.service';

export const initialState: GroupListStateModel = {
  apiStatus: undefined,
  apiResult: {
    data: [],
  },
};

@State<GroupListStateModel>({
  name: 'groupList',
  defaults: initialState,
})
@Injectable()
export class GroupListState {
  readonly #groupListService = inject(GroupListService);

  @Action(groupListActions.GetGroupList)
  getGroupList(context: StateContext<GroupListStateModel>): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupListService.getList().pipe(
      switchMap((apiResult: Group[]) => {
        return context.dispatch(
          new groupListActions.GetGroupListSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(new groupListActions.GetGroupListFailed(error));
      }),
    );
  }

  @Action(groupListActions.GetGroupListSuccess)
  getGroupListSuccess(
    context: StateContext<GroupListStateModel>,
    { apiResult }: groupListActions.GetGroupListSuccess,
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

  @Action(groupListActions.GetGroupListFailed)
  getGroupListFailed(context: StateContext<GroupListStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }
}
