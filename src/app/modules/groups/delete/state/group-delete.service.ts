import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class GroupDeleteService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  deleteGroup(groupId: number): Observable<void> {
    return this.#http.delete<void>(`${this.#apiUrl}/groups/${groupId}`);
  }
}
