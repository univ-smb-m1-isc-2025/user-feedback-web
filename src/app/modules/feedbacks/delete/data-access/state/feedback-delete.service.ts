import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'uf/modules/feedbacks/list/data-access/state';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class FeedbackDeleteService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  delete(feedbackId: number): Observable<Feedback[]> {
    return this.#http.delete<Feedback[]>(
      `${this.#apiUrl}/feedbacks/${feedbackId}`,
    );
  }
}
