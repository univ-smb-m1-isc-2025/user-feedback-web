import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'uf/modules/groups/list/data-access/state';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class GroupNotJoinedListService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  getList(): Observable<Group[]> {
    return this.#http.get<Group[]>(`${this.#apiUrl}/groups/not-member`);
  }
}
