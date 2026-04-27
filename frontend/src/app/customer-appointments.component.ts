import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAppointment, CustomerService } from './customer.service';

@Component({
  selector: 'app-customer-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-appointments.html',
  styleUrls: ['./customer-appointments.css'],
})
export class CustomerAppointmentsComponent {
  appointments: CustomerAppointment[] = [];
  history: CustomerAppointment[] = [];
  loadingAppointments = false;
  loadingHistory = false;
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  loadData(customerId: string): void {
    this.error = null;
    this.appointments = [];
    this.history = [];

    if (!customerId?.trim()) {
      this.error = 'אנא הזן תעודת זהות.';
      return;
    }

    const id = customerId.trim();

    // Load appointments (future)
    this.loadingAppointments = true;
    this.customerService.getAppointments(id).subscribe({
      next: (data) => {
        this.appointments = data;
        this.loadingAppointments = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת תורים. וודא שהשרת פועל.';
        this.loadingAppointments = false;
      },
    });

    // Load history (past)
    this.loadingHistory = true;
    this.customerService.getHistory(id).subscribe({
      next: (data) => {
        this.history = data;
        this.loadingHistory = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת היסטוריה. וודא שהשרת פועל.';
        this.loadingHistory = false;
      },
    });
  }
}
