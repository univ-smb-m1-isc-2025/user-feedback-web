import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { LoaderComponent } from 'uf/shared/components/loader';

import { groupDeleteActions } from '../../delete/state';
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
  ],
})
export class GroupListComponent implements OnInit {
  readonly #store = inject(Store);

  readonly groupListSignal = this.#store.selectSignal(groupList);
  readonly loading = this.#store.selectSignal(groupListLoading);

  ngOnInit(): void {
    this.#store.dispatch(new groupListActions.GetGroupList());
  }

  deleteGroup(groupId: number): void {
    this.#store.dispatch(new groupDeleteActions.DeleteGroup(groupId));
  }
}
