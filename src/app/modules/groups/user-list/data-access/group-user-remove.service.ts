import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class GroupUserRemoveService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  removeUserFromGroup(groupId: number, userId: number): Observable<void> {
    // Correction du chemin d'API - utiliser DELETE avec /users/{userId}
    return this.#http.delete<void>(
      `${this.#apiUrl}/groups/${groupId}/users/${userId}`,
    );
  }
}
