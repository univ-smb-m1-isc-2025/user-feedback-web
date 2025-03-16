import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Store } from '@ngxs/store';
import { LoaderComponent } from 'uf/shared/components/loader';
import { groupId } from 'uf/shared/data-access/router';

import { feedbackList, feedbackListLoading } from '../data-access/queries';
import { feedbackListActions } from '../data-access/state';

@Component({
  selector: 'uf-feedback-list',
  standalone: true,
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoaderComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
})
export class FeedbackListComponent implements OnInit {
  readonly #store = inject(Store);

  readonly feedbackListSignal = this.#store.selectSignal(feedbackList);
  readonly loading = this.#store.selectSignal(feedbackListLoading);

  ngOnInit(): void {
    const group = this.#store.selectSnapshot(groupId);
    this.#store.dispatch(new feedbackListActions.GetFeedbackList(group));
  }
}
