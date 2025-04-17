import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'uf/core/services/auth/state';
import { AvatarComponent } from 'uf/shared/components/avatar';
import { LoaderComponent } from 'uf/shared/components/loader';

import {
  groupAddUserActions,
  groupAddUserUiActions,
} from '../data-access/state';

@Component({
  selector: 'uf-group-add-user-dialog',
  standalone: true,
  templateUrl: './group-add-user-dialog.component.html',
  styleUrl: './group-add-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LoaderComponent,
    AvatarComponent,
  ],
})
export class GroupAddUserDialogComponent {
  readonly #store = inject(Store);
  readonly data = inject<{ groupId: number }>(MAT_DIALOG_DATA);

  // Définition correcte des signaux
  loading = signal(false);
  searchResults = signal<User[]>([]);

  searchTerm = '';
  private searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        if (term.trim().length >= 2) {
          // Passage du groupId avec le terme de recherche
          this.#store.dispatch(
            new groupAddUserActions.SearchUsers(term.trim(), this.data.groupId),
          );

          // Souscriptions aux changements d'état...
          this.#store
            .select((state) => state.groupAddUser?.apiStatus)
            .subscribe((status) => {
              this.loading.set(status === 'loading');
            });

          this.#store
            .select((state) => state.groupAddUser?.searchResults)
            .subscribe((results) => {
              if (Array.isArray(results)) {
                this.searchResults.set(results);
              } else {
                this.searchResults.set([]);
              }
            });
        }
      });
  }

  onSearchChange(term: string): void {
    this.searchTerms.next(term);
  }

  addUserToGroup(userId: number): void {
    this.#store.dispatch(
      new groupAddUserActions.AddUserToGroup(this.data.groupId, userId),
    );
  }

  onCancel(): void {
    this.#store.dispatch(new groupAddUserUiActions.CloseAddUserDialog());
  }
}
