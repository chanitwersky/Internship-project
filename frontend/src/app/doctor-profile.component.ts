import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../services/auth/auth';
import { DoctorProfileService } from './doctor-profile.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './doctor-profile.html',
  styleUrls: ['./doctor-profile.css'],
})
export class DoctorProfileComponent implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);
  private profileService = inject(DoctorProfileService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  doctorId = '';
  name = '';
  specialty = '';
  loading = false;
  saving = false;
  error: string | null = null;

  ngOnInit(): void {
    const loggedInId = this.auth.getLoggedInUserId()?.trim();
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    if (!loggedInId || !token || userType !== 'Doctor') {
      this.router.navigate(['/login']);
      return;
    }

    this.doctorId = loggedInId;
    void this.loadProfile();
  }

  async loadProfile(): Promise<void> {
    if (!this.doctorId.trim()) {
      this.error = 'מזהה רופא חסר. התחבר מחדש.';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const profile = await firstValueFrom(
        this.profileService.getProfile(this.doctorId)
      );
      this.name = profile.name;
      this.specialty = profile.specialty;
    } catch (err: unknown) {
      this.error = this.profileLoadErrorMessage(err);
      console.error('Doctor profile load failed:', err);
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  saveProfile(): void {
    if (!this.name.trim() || !this.specialty.trim()) {
      this.error = 'יש למלא שם והתמחות.';
      return;
    }

    this.saving = true;
    this.error = null;

    this.profileService
      .updateProfile(this.doctorId, {
        name: this.name.trim(),
        specialty: this.specialty.trim(),
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('הפרופיל עודכן בהצלחה', 'סגור', { duration: 4000 });
          this.cdr.markForCheck();
        },
        error: (err: unknown) => {
          this.saving = false;
          this.error = this.profileSaveErrorMessage(err);
          console.error('Doctor profile save failed:', err);
          this.cdr.markForCheck();
        },
      });
  }

  private profileLoadErrorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'לא ניתן להתחבר לשרת. ודא שה-backend רץ על http://localhost:5141.';
      }
      if (err.status === 404) {
        return 'פרופיל הרופא לא נמצא. נסה להתחבר מחדש עם מזהה רופא תקין (לדוגמה 000000001).';
      }
      if (err.status === 401 || err.status === 403) {
        return 'ההרשאה פגה. התחבר מחדש.';
      }
      const serverMessage =
        typeof err.error === 'object' && err.error && 'message' in err.error
          ? String((err.error as { message: string }).message)
          : null;
      if (serverMessage) {
        return serverMessage;
      }
    }

    if (
      err instanceof Error &&
      (err.name === 'TimeoutError' || err.message.includes('Timeout'))
    ) {
      return 'תם הזמן המוקצב לטעינת הפרופיל. ודא שהשרת פועל על פורט 5141.';
    }

    return 'נכשל בטעינת פרופיל הרופא.';
  }

  private profileSaveErrorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'לא ניתן להתחבר לשרת. ודא שה-backend רץ על http://localhost:5141.';
      }
      if (err.status === 404) {
        return 'פרופיל הרופא לא נמצא.';
      }
    }
    return 'נכשל בשמירת הפרופיל.';
  }
}
