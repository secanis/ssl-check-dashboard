import { Injectable } from '@angular/core';

import { AuthRepository } from '../../state/auth.repository';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { getUrlConfig } from '../url';
import { catchError, tap } from 'rxjs';
import { UserStore } from '../../../../../server/src/types';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authRepository: AuthRepository
  ) {}

  login(username: string, password: string) {
    const { API_URL, BASE_API_PATH } = getUrlConfig();
    this.http
      .post(`${API_URL}${BASE_API_PATH}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.authRepository.setSession(res.access_token, '');
          if (res.access_token) {
            this.router.navigate(['/dashboard']);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.authRepository.setSession('', err.message);
          return err.message;
        })
      )
      .subscribe();
  }
}
