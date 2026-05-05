import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CustomerAppointment,
  CustomerService,
  UpdateAppointmentRequest,
  UpdateCustomerSettingsRequest,
} from './customer.service';

@Component({
  selector: 'app-customer-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-appointments.html',
  styleUrls: ['./customer-appointments.css'],
})
export class CustomerAppointmentsComponent {
  appointments: CustomerAppointment[] = [];
  history: CustomerAppointment[] = [];
  loadingAppointments = false;
  loadingHistory = false;
  loadingDetails = false;
  error: string | null = null;
  status: string | null = null;
  currentCustomerId = '';

  appointmentId = '';
  appointmentWorkerId = '';
  appointmentDescription = '';
  appointmentDate = '';

  selectedAppointment: CustomerAppointment | null = null;

  createWorkerId = '';
  createDescription = '';
  createDate = '';

  settingsFirstName = '';
  settingsLastName = '';
  settingsPhone = '';
  settingsAdress = '';
  settingsEmail = '';
  settingsLastVisit = '';

  constructor(private customerService: CustomerService) {}

  loadData(customerId: string): void {
    this.error = null;
    this.status = null;
    this.appointments = [];
    this.history = [];
    this.currentCustomerId = '';

    if (!customerId?.trim()) {
      this.error = 'אנא הזן תעודת זהות.';
      return;
    }

    const id = customerId.trim();
    this.currentCustomerId = id;

    this.loadingAppointments = true;
    this.customerService.getAppointments(id).subscribe({
      next: (data) => {
        this.appointments = data;
        this.selectedAppointment = null;
        this.clearAppointmentForm();
        this.loadingAppointments = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת תורים. וודא שהשרת פועל.';
        this.loadingAppointments = false;
      },
    });

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

    this.loadingDetails = true;
    this.customerService.getCustomerDetails(id).subscribe({
      next: (customer) => {
        this.settingsFirstName = customer.firstName;
        this.settingsLastName = customer.lastName;
        this.settingsPhone = customer.phone;
        this.settingsAdress = customer.adress;
        this.settingsEmail = customer.email;
        this.settingsLastVisit = this.formatDateForInput(customer.lastVisit);
        this.loadingDetails = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת פרטי לקוח. וודא שהשרת פועל.';
        this.loadingDetails = false;
      },
    });
  }

  createAppointment(): void {
    this.error = null;
    this.status = null;

    if (!this.currentCustomerId) {
      this.error = 'טען תחילה תעודת זהות של לקוח.';
      return;
    }

    if (!this.createWorkerId.trim() || !this.createDescription.trim() || !this.createDate.trim()) {
      this.error = 'יש למלא את כל פרטי יצירת התור.';
      return;
    }

    const nextId = this.getNextAppointmentId();
    const request: UpdateAppointmentRequest = {
      workerId: this.createWorkerId.trim(),
      treatmentDescription: this.createDescription.trim(),
      date: this.createDate,
    };

    this.customerService
      .updateAppointment(this.currentCustomerId, nextId, request)
      .subscribe({
        next: () => {
          this.status = `תור חדש נוצר בהצלחה (מספר ${nextId}).`;
          this.clearCreateForm();
          this.loadData(this.currentCustomerId);
        },
        error: () => {
          this.error = 'נכשל ביצירת התור. וודא שהשרת פועל.';
        },
      });
  }

  private getNextAppointmentId(): number {
    if (!this.appointments || !this.appointments.length) {
      return 1;
    }

    return Math.max(...this.appointments.map((item) => item.id)) + 1;
  }

  private clearCreateForm(): void {
    this.createWorkerId = '';
    this.createDescription = '';
    this.createDate = '';
  }

  submitAppointment(): void {
    this.error = null;
    this.status = null;

    if (!this.currentCustomerId) {
      this.error = 'טען תחילה תעודת זהות של לקוח.';
      return;
    }

    const appointmentId = Number(this.appointmentId);
    if (!appointmentId || !this.appointmentWorkerId.trim() || !this.appointmentDescription.trim() || !this.appointmentDate.trim()) {
      this.error = 'יש למלא את כל פרטי התור.';
      return;
    }

    const request: UpdateAppointmentRequest = {
      workerId: this.appointmentWorkerId.trim(),
      treatmentDescription: this.appointmentDescription.trim(),
      date: this.appointmentDate,
    };

    this.customerService
      .updateAppointment(this.currentCustomerId, appointmentId, request)
      .subscribe({
        next: () => {
          this.status = 'התור עודכן בהצלחה.';
          this.loadData(this.currentCustomerId);
        },
        error: () => {
          this.error = 'נכשל בעדכון התור. וודא שהשרת פועל.';
        },
      });
  }

  selectAppointment(item: CustomerAppointment): void {
    this.selectedAppointment = item;
    this.appointmentId = item.id.toString();
    this.appointmentWorkerId = item.workerId;
    this.appointmentDescription = item.treatmentDescription;
    this.appointmentDate = this.formatDateForInput(item.date);
    this.status = `נבחר תור מספר ${item.id} לעריכה.`;
  }

  clearAppointmentForm(): void {
    this.appointmentId = '';
    this.appointmentWorkerId = '';
    this.appointmentDescription = '';
    this.appointmentDate = '';
  }

  clearSelectedAppointment(): void {
    this.selectedAppointment = null;
    this.clearAppointmentForm();
    this.status = 'בחירת התור בוטלה.';
    this.error = null;
  }

  private formatDateForInput(dateValue: string): string {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return '';
    }
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  }

  submitSettings(): void {
    this.error = null;
    this.status = null;

    if (!this.currentCustomerId) {
      this.error = 'טען תחילה תעודת זהות של לקוח.';
      return;
    }

    const request: UpdateCustomerSettingsRequest = {
      firstName: this.settingsFirstName?.trim() || undefined,
      lastName: this.settingsLastName?.trim() || undefined,
      phone: this.settingsPhone?.trim() || undefined,
      adress: this.settingsAdress?.trim() || undefined,
      email: this.settingsEmail?.trim() || undefined,
      lastVisit: this.settingsLastVisit?.trim() || undefined,
    };

    if (!Object.values(request).some((value) => value)) {
      this.error = 'יש למלא לפחות שדה אחד בעדכון הגדרות.';
      return;
    }

    this.customerService.updateCustomerSettings(this.currentCustomerId, request).subscribe({
      next: () => {
        this.status = 'הגדרות הלקוח עודכנו בהצלחה.';
      },
      error: () => {
        this.error = 'נכשל בעדכון הגדרות הלקוח. וודא שהשרת פועל.';
      },
    });
  }
}
