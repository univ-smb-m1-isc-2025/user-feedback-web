import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { token } from 'uf/core/services/auth/queries';
import { routeUsersSignIn } from 'uf/modules/users';

@Component({
  selector: 'uf-group-layout',
  standalone: true,
  templateUrl: './group-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class GroupLayoutComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly jwtSignal = this.#store.selectSignal(token);
  readonly routeUsersSignInSignal = this.#store.selectSignal(routeUsersSignIn);

  jwtEffect = effect(() => {
    if (!this.jwtSignal()) {
      this.#router.navigate(untracked(this.routeUsersSignInSignal));
    }
  });
}
