import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatExpansionPanelActionRow } from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { routeUsersSignIn } from 'uf/modules/users';

import { userSignUpActions } from '../data-access/state';

@Component({
  selector: 'uf-users-sign-up-page',
  standalone: true,
  templateUrl: './users-sign-up-page.component.html',
  styleUrl: './users-sign-up-page.component.scss',
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
    MatIcon,
  ],
})
export class UsersSignUpPageComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #store = inject(Store);

  readonly routeUsersSignInSignal = this.#store.selectSignal(routeUsersSignIn);

  signUpForm = this.#formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.#store.dispatch(
      new userSignUpActions.Register(this.signUpForm.getRawValue()),
    );
  }
}
