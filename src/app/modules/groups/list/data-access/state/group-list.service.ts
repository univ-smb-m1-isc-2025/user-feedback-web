import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { user } from 'uf/core/services/auth/queries';
import { API_URL } from 'uf/shared/data-access';

import { Group } from './group-list.models';

@Injectable({ providedIn: 'root' })
export class GroupListService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);
  readonly #store = inject(Store);

  getList(): Observable<Group[]> {
    const userLogged = this.#store.selectSnapshot(user);
    return this.#http.get<Group[]>(`${this.#apiUrl}/users/${userLogged?.id}`);
  }
}
