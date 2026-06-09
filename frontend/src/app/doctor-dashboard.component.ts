import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService, DoctorAppointment, WeeklyShift } from './doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css'],
})
export class DoctorDashboardComponent implements OnInit {
  private router = inject(Router);
  doctorId = '000000000';
  appointments: DoctorAppointment[] = [];
  schedule: WeeklyShift[] = [];
  loadingAppointments = false;
  loadingSchedule = false;
  expanded = false;
  error: string | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadTodayAppointments();
    this.loadWeeklySchedule();
  }

  loadTodayAppointments(): void {
    this.error = null;
    this.loadingAppointments = true;
    this.doctorService.getTodayAppointments(this.doctorId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.loadingAppointments = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת תורים להיום. בדוק שהשרת פועל.';
        this.loadingAppointments = false;
      },
    });
  }

  loadWeeklySchedule(): void {
    this.loadingSchedule = true;
    this.doctorService.getWeeklySchedule(this.doctorId).subscribe({
      next: (data) => {
        this.schedule = data;
        this.loadingSchedule = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת לוח השבועי.';
        this.loadingSchedule = false;
      },
    });
  }

  goToAppointmentFill(appointmentId: number): void {
    this.router.navigate(['/doctor/patient', appointmentId]);
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
