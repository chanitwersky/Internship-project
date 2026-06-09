import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CustomerAppointment,
  CustomerService,
  UpdateAppointmentRequest,
  UpdateCustomerSettingsRequest,
} from './customer.service';
import { BookingService, DoctorListItem, formatDoctorOption } from './booking.service';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-customer-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './customer-appointments.html',
  styleUrls: ['./customer-appointments.css'],
})
export class CustomerAppointmentsComponent implements OnInit {
  appointments: CustomerAppointment[] = [];
  history: CustomerAppointment[] = [];
  doctors: DoctorListItem[] = [];
  loadingAppointments = false;
  loadingHistory = false;
  loadingDetails = false;
  loadingDoctors = false;
  loadingCreateSlots = false;
  loadingEditSlots = false;
  error: string | null = null;
  status: string | null = null;
  currentCustomerId = '';
  searchCustomerId = '';

  appointmentId = '';
  appointmentDoctorId = '';
  appointmentDescription = '';
  appointmentDate = '';
  appointmentBookingDate = '';

  selectedAppointment: CustomerAppointment | null = null;
  editAvailableSlots: string[] = [];

  createDoctorId = '';
  createDescription = '';
  createDate = '';
  createBookingDate = '';
  createAvailableSlots: string[] = [];

  settingsFirstName = '';
  settingsLastName = '';
  settingsPhone = '';
  settingsAdress = '';
  settingsEmail = '';
  settingsLastVisit = '';

  constructor(
    private customerService: CustomerService,
    private bookingService: BookingService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.createBookingDate = this.todayDateString();
    this.loadDoctors();

    const loggedInUserId = this.auth.getLoggedInUserId();
    if (loggedInUserId) {
      this.searchCustomerId = loggedInUserId;
      this.loadData(loggedInUserId);
    }
  }

  loadDoctors(): void {
    this.loadingDoctors = true;
    this.bookingService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loadingDoctors = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת רשימת הרופאים. וודא שהשרת פועל.';
        this.loadingDoctors = false;
      },
    });
  }

  onCreateDoctorOrDateChange(): void {
    this.createAvailableSlots = [];
    this.createDate = '';

    if (!this.createDoctorId || !this.createBookingDate) {
      return;
    }

    this.loadingCreateSlots = true;
    this.bookingService.getAvailability(this.createDoctorId, this.createBookingDate).subscribe({
      next: (response) => {
        this.createAvailableSlots = response.slots ?? [];
        this.loadingCreateSlots = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת זמנים פנויים. בחר רופא ותאריך תקינים.';
        this.loadingCreateSlots = false;
      },
    });
  }

  onEditDoctorOrDateChange(): void {
    this.editAvailableSlots = [];

    if (!this.appointmentDoctorId || !this.appointmentBookingDate) {
      return;
    }

    this.loadingEditSlots = true;
    this.bookingService.getAvailability(this.appointmentDoctorId, this.appointmentBookingDate).subscribe({
      next: (response) => {
        this.editAvailableSlots = response.slots ?? [];
        this.loadingEditSlots = false;
      },
      error: () => {
        this.error = 'נכשל בטעינת זמנים פנויים לעריכה.';
        this.loadingEditSlots = false;
      },
    });
  }

  selectCreateSlot(slot: string): void {
    this.createDate = this.formatDateForInput(slot);
    this.status = 'נבחר זמן פנוי לתור החדש.';
    this.error = null;
  }

  selectEditSlot(slot: string): void {
    this.appointmentDate = this.formatDateForInput(slot);
    this.status = 'נבחר זמן פנוי לעדכון התור.';
    this.error = null;
  }

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

    if (!this.createDoctorId || !this.createDescription.trim() || !this.createDate.trim()) {
      this.error = 'יש לבחור רופא, זמן פנוי ולמלא תיאור טיפול.';
      return;
    }

    const nextId = this.getNextAppointmentId();
    const request: UpdateAppointmentRequest = {
      workerId: this.createDoctorId,
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
    this.createDoctorId = '';
    this.createDescription = '';
    this.createDate = '';
    this.createBookingDate = this.todayDateString();
    this.createAvailableSlots = [];
  }

  submitAppointment(): void {
    this.error = null;
    this.status = null;

    if (!this.currentCustomerId) {
      this.error = 'טען תחילה תעודת זהות של לקוח.';
      return;
    }

    const appointmentId = Number(this.appointmentId);
    if (
      !appointmentId ||
      !this.appointmentDoctorId ||
      !this.appointmentDescription.trim() ||
      !this.appointmentDate.trim()
    ) {
      this.error = 'יש לבחור רופא, זמן ולמלא את כל פרטי התור.';
      return;
    }

    const request: UpdateAppointmentRequest = {
      workerId: this.appointmentDoctorId,
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
    this.appointmentDoctorId = item.workerId;
    this.appointmentDescription = item.treatmentDescription;
    this.appointmentDate = this.formatDateForInput(item.date);
    this.appointmentBookingDate = this.toDateString(item.date);
    this.status = `נבחר תור מספר ${item.id} לעריכה.`;
    this.onEditDoctorOrDateChange();
  }

  clearAppointmentForm(): void {
    this.appointmentId = '';
    this.appointmentDoctorId = '';
    this.appointmentDescription = '';
    this.appointmentDate = '';
    this.appointmentBookingDate = '';
    this.editAvailableSlots = [];
  }

  clearSelectedAppointment(): void {
    this.selectedAppointment = null;
    this.clearAppointmentForm();
    this.status = 'בחירת התור בוטלה.';
    this.error = null;
  }

  getDoctorLabel(doctor: DoctorListItem): string {
    return formatDoctorOption(doctor);
  }

  getDoctorName(doctorId: string): string {
    const doctor = this.doctors.find((item) => item.id === doctorId);
    return doctor ? formatDoctorOption(doctor) : doctorId;
  }

  formatSlotLabel(slot: string): string {
    const date = new Date(slot);
    if (isNaN(date.getTime())) {
      return slot;
    }

    return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  }

  private todayDateString(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private toDateString(dateValue: string): string {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return this.todayDateString();
    }

    return date.toISOString().slice(0, 10);
  }

  formatDateForInput(dateValue: string): string {
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
