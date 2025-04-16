import {
  ChangeDetectionStrategy,
  Component,
  computed, inject,
  input
} from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'uf/environments/environment';
import { cacheBuster } from 'uf/modules/users/change-profile-picture/data-access/queries';

@Component({
  selector: 'uf-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  readonly userId = input.required<number>();

  readonly #store = inject(Store);

  readonly cacheBuster = this.#store.selectSignal(cacheBuster);

  avatarUrl = computed(
    () =>
      `url('${environment.apiBaseUrl}/users/${this.userId()}/profile-picture?t=${this.cacheBuster()})`,
  );
}
