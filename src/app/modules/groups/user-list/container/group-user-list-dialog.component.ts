import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { Store } from '@ngxs/store';
import { user } from 'uf/core/services/auth/queries';
import { User } from 'uf/core/services/auth/state';
import { groupDetails, groupDetailsActions } from 'uf/modules/groups/details';
import { AvatarComponent } from 'uf/shared/components/avatar';

import { groupId } from 'uf/shared/data-access/router';

import { groupUserListUiActions, groupUserRemoveActions } from '../data-access';

@Component({
  selector: 'uf-group-user-list-dialog',
  standalone: true,
  templateUrl: './group-user-list-dialog.component.html',
  styleUrl: './group-user-list-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatDialogTitle,
    MatList,
    MatListItem,
    MatDivider,
    AvatarComponent,
  ],
})
export class GroupUserListDialogComponent implements OnInit {
  readonly #store = inject(Store);

  readonly groupDetails = this.#store.selectSignal(groupDetails);

  readonly currentUser = this.#store.selectSignal(user);
  readonly removingUserIds = signal<number[]>([]);

  readonly users = computed(() => {
    return this.groupDetails()?.users ?? [];
  });

  ngOnInit(): void {
    const id = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(new groupDetailsActions.GetUsers(id));
  }

  canRemoveUser(targetUser: User): boolean {
    const currentUserData = this.currentUser();

    // Si l'utilisateur courant est le propriétaire du groupe
    if (this.groupDetails()?.owner?.id === currentUserData?.id) {
      // Ne pas permettre de se supprimer soi-même
      return targetUser.id !== currentUserData?.id;
    }

    return false;
  }

  isRemoving(userId: number): boolean {
    return this.removingUserIds().includes(userId);
  }

  removeUser(userId: number): void {
    console.log(
      `Tentative de suppression de l'utilisateur ${userId} du groupe ${this.groupDetails()?.id}`,
    );

    // Ajouter l'id aux utilisateurs en cours de suppression
    this.removingUserIds.update((ids) => [...ids, userId]);
    const id = this.groupDetails()?.id;
    if (id) {
      const action = new groupUserRemoveActions.RemoveUserFromGroup(id, userId);
      console.log('Action à dispatcher:', action);

      this.#store.dispatch(action).subscribe({
        next: (result) => {
          console.log('Action dispatched with result:', result);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.removingUserIds.update((ids) =>
            ids.filter((id) => id !== userId),
          );
        },
        complete: () => {
          console.log('Suppression terminée');
          this.removingUserIds.update((ids) =>
            ids.filter((id) => id !== userId),
          );
        },
      });
    }
  }

  onClose(): void {
    this.#store.dispatch(new groupUserListUiActions.CloseUserListGroupDialog());
  }
}
