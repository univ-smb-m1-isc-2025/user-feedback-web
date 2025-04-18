import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'uf/core/services/auth/state';
import { API_URL } from 'uf/shared/data-access';

import { Group } from '../list/data-access/state';

@Injectable({ providedIn: 'root' })
export class GroupDetailsService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  getDetails(groupId: number): Observable<Group> {
    return this.#http.get<Group>(`${this.#apiUrl}/groups/${groupId}`);
  }

  getSubgroups(groupId: number): Observable<Group[]> {
    return this.#http.get<Group[]>(
      `${this.#apiUrl}/groups/${groupId}/subgroups`,
    );
  }

  getUsers(groupId: number): Observable<User[]> {
    return this.#http.get<User[]>(`${this.#apiUrl}/groups/${groupId}/users`);
  }
}
