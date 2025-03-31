import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { FeedbackCreateApiResult, FeedbackCreateBody } from './feedback-create.models';

@Injectable({ providedIn: 'root' })
export class FeedbackCreateService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  create(body: FeedbackCreateBody, groupId: number): Observable<FeedbackCreateApiResult> {
    const params = new HttpParams().set('groupId', groupId);

    return this.#http.post<FeedbackCreateApiResult>(
      `${this.#apiUrl}/feedbacks`,
      body,
      { params },
    );
  }
}
