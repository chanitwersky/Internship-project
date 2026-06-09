import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, CustomerAppointment } from './customer.service';

@Component({
  selector: 'app-doctor-patient-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-patient-history.html',
  styleUrls: ['./doctor-patients.css'],
})
export class DoctorPatientHistoryComponent implements OnInit {
  patientId = '';
  history: CustomerAppointment[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientId') ?? '';
    this.loading = true;
    this.customerService.getHistory(this.patientId).subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת היסטוריה. וודא שהשרת פועל.';
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/doctor/patients']);
  }
}
