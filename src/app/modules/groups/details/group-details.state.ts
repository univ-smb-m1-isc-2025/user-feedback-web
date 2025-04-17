import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, Observable, switchMap } from 'rxjs';

import * as groupDetailsActions from './group-details.actions';
import { GroupDetailsStateModel } from './group-details.models';
import { GroupDetailsService } from './group-details.service';
import { Group } from '../list/data-access/state';

export const initialState: GroupDetailsStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<GroupDetailsStateModel>({
  name: 'groupDetails',
  defaults: initialState,
})
@Injectable()
export class GroupDetailsState {
  readonly #groupDetailsService = inject(GroupDetailsService);

  @Action(groupDetailsActions.GetGroupDetails)
  getGroupDetails(
    context: StateContext<GroupDetailsStateModel>,
    { groupId }: groupDetailsActions.GetGroupDetails,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#groupDetailsService.getDetails(groupId).pipe(
      switchMap((apiResult: Group) => {
        return context.dispatch(
          new groupDetailsActions.GetGroupDetailsSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new groupDetailsActions.GetGroupDetailsFailed(error),
        );
      }),
    );
  }

  @Action(groupDetailsActions.GetGroupDetailsSuccess)
  getGroupDetailsSuccess(
    context: StateContext<GroupDetailsStateModel>,
    { apiResult }: groupDetailsActions.GetGroupDetailsSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult: {
          ...apiResult,
          subgroups: [],
          subgroupsLoading: undefined,
        },
      }),
    );

    if (apiResult.subGroupCount > 0) {
      context.dispatch(new groupDetailsActions.GetSubgroups(apiResult.id));
    }
  }

  @Action(groupDetailsActions.GetGroupDetailsFailed)
  getGroupDetailsFailed(context: StateContext<GroupDetailsStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }

  @Action(groupDetailsActions.GetSubgroups)
  getSubgroups(
    context: StateContext<GroupDetailsStateModel>,
    { groupId }: groupDetailsActions.GetSubgroups,
  ): Observable<void> {
    context.setState(
      patch({
        apiResult: patch({
          subgroupsLoading: 'loading',
        }),
      }),
    );

    return this.#groupDetailsService.getSubgroups(groupId).pipe(
      switchMap((apiResult: Group[]) => {
        return context.dispatch(
          new groupDetailsActions.GetSubgroupsSuccess(apiResult),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new groupDetailsActions.GetSubgroupsFailed(error),
        );
      }),
    );
  }

  @Action(groupDetailsActions.GetSubgroupsSuccess)
  getSubgroupsSuccess(
    context: StateContext<GroupDetailsStateModel>,
    { apiResult }: groupDetailsActions.GetSubgroupsSuccess,
  ): void {
    context.setState(
      patch({
        apiResult: patch({
          subgroupsLoading: 'success',
          subgroups: apiResult,
        }),
      }),
    );
  }

  @Action(groupDetailsActions.GetSubgroupsFailed)
  getSubgroupsFailed(context: StateContext<GroupDetailsStateModel>): void {
    context.setState(
      patch({
        apiResult: patch({
          subgroupsLoading: 'failure',
        }),
      }),
    );
  }

  @Action(groupDetailsActions.GroupDetailsResetState)
  groupDetailsResetState(
    context: StateContext<groupDetailsActions.GroupDetailsResetState>,
  ): void {
    context.setState(initialState);
  }
}
