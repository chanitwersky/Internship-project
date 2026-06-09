import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService, DoctorAppointment, WeeklyShift } from './doctor.service';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css'],
})
export class DoctorDashboardComponent implements OnInit {
  private router = inject(Router);
  private auth = inject(Auth);
  doctorId = '';
  appointments: DoctorAppointment[] = [];
  schedule: WeeklyShift[] = [];
  loadingAppointments = false;
  loadingSchedule = false;
  expanded = false;
  error: string | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    const loggedInId = this.auth.getLoggedInUserId();
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    if (!loggedInId || !token || userType !== 'Doctor') {
      this.router.navigate(['/login']);
      return;
    }

    this.doctorId = loggedInId;
    this.loadTodayAppointments();
    this.loadWeeklySchedule();
  }

  loadTodayAppointments(): void {
    this.error = null;
    this.loadingAppointments = true;
    this.doctorService
      .getTodayAppointments(this.doctorId)
      .pipe(finalize(() => (this.loadingAppointments = false)))
      .subscribe({
        next: (data) => {
          this.appointments = data;
        },
        error: () => {
          this.error = 'נכשל בטעינת תורים להיום. ודא שהשרת פועל על פורט 5141.';
        },
      });
  }

  loadWeeklySchedule(): void {
    this.loadingSchedule = true;
    this.doctorService
      .getWeeklySchedule(this.doctorId)
      .pipe(finalize(() => (this.loadingSchedule = false)))
      .subscribe({
        next: (data) => {
          this.schedule = data;
        },
        error: () => {
          this.error = 'נכשל בטעינת לוח השבועי. ודא שהשרת פועל על פורט 5141.';
        },
      });
  }

  goToAppointmentFill(appointmentId: number): void {
    this.router.navigate(['/doctor/appointment-fill', appointmentId]);
  }

  goToMyPatients(): void {
    this.router.navigate(['/doctor/patients']);
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  trackByAppointment(_index: number, item: DoctorAppointment): number {
    return item.id;
  }
}
