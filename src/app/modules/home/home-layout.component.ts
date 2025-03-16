import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { token } from 'uf/core/services/auth/queries';
import { groupCreateUiActions } from 'uf/modules/groups/create/data-access/state';
import { GroupListComponent } from 'uf/modules/groups/list/containers';
import { routeUsersSignIn } from 'uf/modules/users';

@Component({
  selector: 'uf-home-layout',
  standalone: true,
  templateUrl: './home-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupListComponent, MatButton],
})
export class HomeLayoutComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly jwtSignal = this.#store.selectSignal(token);
  readonly routeUsersSignInSignal = this.#store.selectSignal(routeUsersSignIn);

  jwtEffect = effect(() => {
    if (!this.jwtSignal()) {
      this.#router.navigate(untracked(this.routeUsersSignInSignal));
    }
  });

  addGroup(): void {
    this.#store.dispatch(new groupCreateUiActions.OpenCreateGroupDialog());
  }
}
