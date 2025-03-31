import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

import { AuthApiResult, LoginRequestBody } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  authenticate(body: LoginRequestBody): Observable<AuthApiResult> {
    return this.#http.post<AuthApiResult>(`${this.#apiUrl}/auth/login`, body);
  }
}
