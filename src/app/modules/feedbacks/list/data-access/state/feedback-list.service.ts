import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { Comment, Feedback } from './feedback-list.models';

@Injectable({ providedIn: 'root' })
export class FeedbackListService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  getList(groupId: number): Observable<Feedback[]> {
    return this.#http.get<Feedback[]>(
      `${this.#apiUrl}/feedbacks/group/${groupId}`,
    );
  }

  getComments(feebackId: number): Observable<Comment[]> {
    return this.#http.get<Comment[]>(
      `${this.#apiUrl}/comments/feedback/${feebackId}`,
    );
  }
}
