import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentApiResult } from 'uf/modules/feedbacks/comment/state/comment.models';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class CommentService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  createComment(
    feedbackId: number,
    description: string,
  ): Observable<CreateCommentApiResult> {
    const params = new HttpParams().set('feedbackId', feedbackId);
    const body = {
      description,
    };

    return this.#http.post<CreateCommentApiResult>(
      `${this.#apiUrl}/comments`,
      body,
      { params },
    );
  }
}
