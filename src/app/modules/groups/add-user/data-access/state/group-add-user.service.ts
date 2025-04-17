import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'uf/core/services/auth/state';
import { API_URL } from 'uf/shared/data-access';

import { AddUserToGroupResponse } from './group-add-user.models';

@Injectable({ providedIn: 'root' })
export class GroupAddUserService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  searchUsers(searchTerm: string, groupId: number): Observable<User[]> {
    // Ajout du groupId dans les paramètres de la requête
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('groupId', groupId.toString());
      
    return this.#http.get<User[]>(`${this.#apiUrl}/users/search`, { params });
  }

  addUserToGroup(groupId: number, userId: number): Observable<AddUserToGroupResponse> {
    return this.#http.post<AddUserToGroupResponse>(
      `${this.#apiUrl}/groups/${groupId}/users`,
      {},
      { params: new HttpParams().set('userId', userId) }
    );
  }
}