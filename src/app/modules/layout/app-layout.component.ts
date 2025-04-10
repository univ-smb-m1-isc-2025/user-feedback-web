import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCardAvatar,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { token } from 'uf/core/services/auth/queries';
import { routeUsersSignIn } from 'uf/modules/users';
import { AvatarComponent } from 'uf/shared/components/avatar';

import { changeProfilePictureUiActions } from '../users/change-profile-picture/data-access/state';

@Component({
  selector: 'uf-app-layout',
  standalone: true,
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    AvatarComponent,
    MatCardAvatar,
    MatCardTitle,
    MatCardHeader,
    MatButton,
  ],
})
export class AppLayoutComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly jwtSignal = this.#store.selectSignal(token);
  readonly routeUsersSignInSignal = this.#store.selectSignal(routeUsersSignIn);

  jwtEffect = effect(() => {
    if (!this.jwtSignal()) {
      this.#router.navigate(untracked(this.routeUsersSignInSignal));
    }
  });

  openChangeProfilePictureDialog(): void {
    this.#store.dispatch(
      new changeProfilePictureUiActions.OpenChangeProfilePictureDialog(),
    );
  }
}
