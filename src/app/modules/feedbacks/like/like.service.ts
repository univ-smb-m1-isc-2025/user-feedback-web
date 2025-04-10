import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class LikeService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  likeComment(commentId: number, likeOrDislike: boolean): Observable<void> {
    return this.#http.get<void>(
      `${this.#apiUrl}/like/${commentId}/comment?isLike=${likeOrDislike}`,
    );
  }

  likeFeedback(feedbackId: number, likeOrDislike: boolean): Observable<void> {
    return this.#http.get<void>(
      `${this.#apiUrl}/like/${feedbackId}/feedback?isLike=${likeOrDislike}`,
    );
  }
}
