import { HttpClient } from '@angular/common/http';
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
    parentGroupId: number | undefined,
  ): Observable<GroupCreateApiResult> {
    return this.#http.post<GroupCreateApiResult>(
      parentGroupId
        ? `${this.#apiUrl}/groups/${parentGroupId}/subgroups`
        : `${this.#apiUrl}/groups`,
      body,
    );
  }
}
