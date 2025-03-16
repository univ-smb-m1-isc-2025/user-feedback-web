import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { GroupCreateApiResult, GroupCreateBody } from './group-create.models';

@Injectable({ providedIn: 'root' })
export class GroupCreateService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  createGroup(
    body: GroupCreateBody,
    ownerId: number,
  ): Observable<GroupCreateApiResult> {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      ownerId,
    });

    return this.#http.post<GroupCreateApiResult>(
      `${this.#apiUrl}/groups`,
      body,
      { params },
    );
  }
}
