import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, mergeMap, Observable } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthApiResult, AuthStateModel } from './auth.model';
import { AuthService } from './auth.service';

export const initialState: AuthStateModel = {
  apiStatus: undefined,
  apiResult: undefined,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialState,
})
@Injectable()
export class AuthState {
  readonly #authService = inject(AuthService);

  @Action(authActions.Authenticate)
  authenticate(
    context: StateContext<AuthStateModel>,
    { body }: authActions.Authenticate,
  ): Observable<void> {
    context.setState(
      patch({
        apiStatus: 'loading',
      }),
    );

    return this.#authService.authenticate(body).pipe(
      mergeMap((apiResult: AuthApiResult) => {
        return context.dispatch(new authActions.AuthenticateSuccess(apiResult));
      }),
      catchError((error: HttpErrorResponse) => {
        return context.dispatch(new authActions.AuthenticateFailed(error));
      }),
    );
  }

  @Action(authActions.AuthenticateSuccess)
  authenticateSuccess(
    context: StateContext<AuthStateModel>,
    { apiResult }: authActions.AuthenticateSuccess,
  ): void {
    context.setState(
      patch({
        apiStatus: 'success',
        apiResult,
      }),
    );
  }

  @Action(authActions.AuthenticateFailed)
  authenticateFailed(context: StateContext<AuthStateModel>): void {
    context.setState(
      patch({
        apiStatus: 'failure',
      }),
    );
  }
}
