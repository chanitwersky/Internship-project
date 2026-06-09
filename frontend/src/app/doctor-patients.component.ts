import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService, DoctorPatient } from './doctor.service';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-patients.html',
  styleUrls: ['./doctor-patients.css'],
})
export class DoctorPatientsComponent implements OnInit {
  doctorId = '000000000';
  patients: DoctorPatient[] = [];
  loading = false;
  error: string | null = null;

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.doctorService.getPatients(this.doctorId).subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת רשימת המטופלים. וודא שהשרת פועל.';
        this.loading = false;
      },
    });
  }

  viewHistory(patientId: string): void {
    this.router.navigate(['/doctor/patient-history', patientId]);
  }

  goBack(): void {
    this.router.navigate(['/doctor']);
  }
}
