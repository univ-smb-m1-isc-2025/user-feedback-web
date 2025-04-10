import { NgOptimizedImage } from '@angular/common';
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
  imports: [NgOptimizedImage],
})
export class AvatarComponent {
  readonly userId = input.required<number>();

  avatarUrl = computed(
    () => `${environment.apiBaseUrl}/users/${this.userId()}/profile-picture`,
  );
}
