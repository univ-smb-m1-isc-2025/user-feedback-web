import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';
import { NotifyError, NotifySuccess } from 'uf/core/notification/data-access';
import { routeUsersSignIn } from 'uf/modules/users';

import * as userSignUpActions from './user-sign-up.actions';
import { UserSignUpStateModel } from './user-sign-up.models';
import { UserSignUpService } from './user-sign-up.service';

export const initialState: UserSignUpStateModel = {
  apiStatus: undefined,
};

@State<UserSignUpStateModel>({
  name: 'userSignUp',
  defaults: initialState,
})
@Injectable()
export class UserSignUpState {
  readonly #userSignUpService = inject(UserSignUpService);
  readonly #router = inject(Router);
  readonly #store = inject(Store);

  @Action(userSignUpActions.Register)
  register(
    context: StateContext<UserSignUpStateModel>,
    { body }: userSignUpActions.Register,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#userSignUpService.register(body).pipe(
      mergeMap(() => {
        return context.dispatch(new userSignUpActions.RegisterSuccess());
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(new userSignUpActions.RegisterFailed(error));
      }),
    );
  }

  @Action(userSignUpActions.RegisterSuccess)
  registerSuccess(context: StateContext<UserSignUpStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'success',
      }),
    );

    context.dispatch(new NotifySuccess('Compte créé avec succès'));
    this.#router.navigate(this.#store.selectSnapshot(routeUsersSignIn));
  }

  @Action(userSignUpActions.RegisterFailed)
  registerFailed(context: StateContext<UserSignUpStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );

    context.dispatch(new NotifyError("Le compte n'a pas pu être créé"));
  }
}
