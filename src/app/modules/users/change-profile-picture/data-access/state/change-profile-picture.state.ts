import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';
import { NotifySuccess } from 'uf/core/notification/data-access';

import * as changeProfilePictureActions from './change-profile-picture.actions';
import { ChangeProfilePictureStateModel } from './change-profile-picture.models';
import { ChangeProfilePictureService } from './change-profile-picture.service';

export const initialState: ChangeProfilePictureStateModel = {
  apiStatus: undefined,
  cacheBuster: Date.now(),
};

@State<ChangeProfilePictureStateModel>({
  name: 'changeProfilePicture',
  defaults: initialState,
})
@Injectable()
export class ChangeProfilePictureState {
  readonly #changeProfilePictureService = inject(ChangeProfilePictureService);

  @Action(changeProfilePictureActions.ChangeProfilePicture)
  register(
    context: StateContext<ChangeProfilePictureStateModel>,
    { file }: changeProfilePictureActions.ChangeProfilePicture,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#changeProfilePictureService.uploadImage(file).pipe(
      mergeMap(() => {
        return context.dispatch(
          new changeProfilePictureActions.ChangeProfilePictureSuccess(),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(
          new changeProfilePictureActions.ChangeProfilePictureFailed(error),
        );
      }),
    );
  }

  @Action(changeProfilePictureActions.ChangeProfilePictureSuccess)
  registerSuccess(context: StateContext<ChangeProfilePictureStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'success',
        cacheBuster: Date.now(),
      }),
    );

    context.dispatch(new NotifySuccess('Image changée avec succès'));
  }

  @Action(changeProfilePictureActions.ChangeProfilePictureFailed)
  registerFailed(context: StateContext<ChangeProfilePictureStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
        cacheBuster: Date.now(),
      }),
    );

    context.dispatch(new NotifySuccess('Image changée avec succès'));
  }
}
