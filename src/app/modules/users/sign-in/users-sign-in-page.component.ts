import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatExpansionPanelActionRow } from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { token } from 'uf/core/services/auth/queries';
import { authActions } from 'uf/core/services/auth/state';
import { routeUsersSignUp } from 'uf/modules/users';

@Component({
  selector: 'uf-users-sign-in-page',
  standalone: true,
  templateUrl: './users-sign-in-page.component.html',
  styleUrl: './users-sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatExpansionPanelActionRow,
    RouterLink,
    MatAnchor,
    MatButton,
  ],
})
export class UsersSignInPageComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly jwtSignal = this.#store.selectSignal(token);
  readonly routeUsersSignUpSignal = this.#store.selectSignal(routeUsersSignUp);

  jwtEffect = effect(() => {
    if (this.jwtSignal()) {
      this.#router.navigate(['/', 'groups']);
    }
  });

  signInForm = this.#formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.#store.dispatch(
      new authActions.Authenticate(this.signInForm.getRawValue()),
    );
  }
}
