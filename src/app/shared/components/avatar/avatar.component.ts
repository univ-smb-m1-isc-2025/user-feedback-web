import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { environment } from 'uf/environments/environment';

@Component({
  selector: 'uf-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  readonly userId = input.required<number>();

  avatarUrl = computed(
    () =>
      `url('${environment.apiBaseUrl}/users/${this.userId()}/profile-picture')`,
  );
}
