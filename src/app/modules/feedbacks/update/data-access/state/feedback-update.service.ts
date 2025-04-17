import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import {
  FeedbackCreateApiResult,
  FeedbackCreateBody,
} from './feedback-update.models';

@Injectable({ providedIn: 'root' })
export class FeedbackUpdateService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  update(
    body: FeedbackCreateBody,
    feedbackId: number,
  ): Observable<FeedbackCreateApiResult> {
    return this.#http.put<FeedbackCreateApiResult>(
      `${this.#apiUrl}/feedbacks/${feedbackId}`,
      body,
    );
  }
}
