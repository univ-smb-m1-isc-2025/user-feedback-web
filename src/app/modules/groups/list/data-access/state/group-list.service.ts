import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { Group } from './group-list.models';

@Injectable({ providedIn: 'root' })
export class GroupListService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  getList(): Observable<Group[]> {
    return this.#http.get<Group[]>(`${this.#apiUrl}/groups`);
  }
}
