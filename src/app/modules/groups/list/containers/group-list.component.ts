import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { groupDetailsActions } from 'uf/modules/groups/details';
import { LoaderComponent } from 'uf/shared/components/loader';

import { groupCreateUiActions } from '../../create/data-access/state';
import { groupDeleteActions } from '../../delete/state';
import { groupNotJoined } from '../../not-joined-list/queries';
import { groupNotJoinedListActions } from '../../not-joined-list/state';
import { groupList, groupListLoading } from '../data-access/queries';
import { groupListActions } from '../data-access/state';

@Component({
  selector: 'uf-group-list',
  standalone: true,
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoaderComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatButton,
  ],
})
export class GroupListComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly groupListLoading = this.#store.selectSignal(groupListLoading);
  readonly groupNotJoinedListSignal = this.#store.selectSignal(groupNotJoined);
  readonly groupListSignal = this.#store.selectSignal(groupList);

  readonly groupNotJoined = computed(() => {
    return this.groupNotJoinedListSignal().filter(
      (group) => !group.parentGroupId,
    );
  });

  readonly groupList = computed(() => {
    return this.groupListSignal().filter((group) => !group.parentGroupId);
  });

  ngOnInit(): void {
    this.#store.dispatch([
      new groupListActions.GetGroupList(),
      new groupNotJoinedListActions.GetGroupNotJoinedList(),
    ]);
  }

  ngOnDestroy(): void {
    this.#store.dispatch(new groupDetailsActions.GroupDetailsResetState());
  }

  deleteGroup(groupId: number): void {
    this.#store.dispatch(new groupDeleteActions.DeleteGroup(groupId));
  }

  onClickGroup(groupId: number): void {
    this.#store.dispatch(new groupDetailsActions.GetGroupDetails(groupId));
    this.#router.navigate(['/', 'groups', groupId]);
  }

  addGroup(): void {
    this.#store.dispatch(new groupCreateUiActions.OpenCreateGroupDialog());
  }

  prevent(e: MouseEvent): void {
    e.stopPropagation();
  }
}
