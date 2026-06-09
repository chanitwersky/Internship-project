import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private auth = inject(Auth);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }

  userType(): string | null {
    return localStorage.getItem('userType');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
