import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'uf/shared/data-access';

@Injectable({ providedIn: 'root' })
export class ChangeProfilePictureService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  uploadImage(file: File): Observable<void> {
    const body = new FormData();
    body.append('file', file);

    return this.#http.post<void>(
      `${this.#apiUrl}/users/upload-profile-picture`,
      body,
    );
  }
}
