import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class Auth {
  private apiUrl = 'https://localhost:3001/api/Auth';

  constructor(private http: HttpClient) { }

  // התחברות (Login)
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
        }
      })
    );
  }

  // התנתקות
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
}
