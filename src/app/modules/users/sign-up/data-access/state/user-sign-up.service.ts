import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { RegisterRequestBody } from './user-sign-up.models';

@Injectable({ providedIn: 'root' })
export class UserSignUpService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  register(body: RegisterRequestBody): Observable<void> {
    return this.#http.post<void>(`${this.#apiUrl}/auth/register`, body);
  }
}
