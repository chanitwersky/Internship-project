import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_ROUTES } from '../../app/api-routes';

/** Matches backend LoginRequest – camelCase "id" (case-insensitive on server) */
export interface LoginRequest {
  id: string;
}

export interface LoginResponse {
  userId: string;
  userType: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(id: string): Observable<LoginResponse> {
    const trimmedId = id.trim();
    const body: LoginRequest = { id: trimmedId };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(API_ROUTES.authLogin, body, { headers }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userId', response.userId);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
