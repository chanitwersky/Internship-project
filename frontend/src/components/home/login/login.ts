import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  onLogin(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value.id!.trim()).subscribe({
      next: (res) => {
        if (res.userType === 'Doctor') {
          this.router.navigate(['/doctor']);
        } else {
          this.router.navigate(['/customer']);
        }
      },
      error: () => {
        this.snackBar.open(
          'התחברות נכשלה. ודא שהזנת תעודת זהות תקינה והשרת פועל.',
          'סגור',
          { duration: 5000 }
        );
      },
    });
  }
}
