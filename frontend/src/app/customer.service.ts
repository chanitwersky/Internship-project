import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_ROUTES } from './api-routes';

export interface CustomerAppointment {
  id: number;
  workerId: string;
  customerId: string;
  treatmentDescription: string;
  date: string;
}

export interface CustomerDetails {
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  adress: string;
  email: string;
  lastVisit: string;
}

export interface UpdateAppointmentRequest {
  workerId: string;
  treatmentDescription: string;
  date: string;
}

export interface UpdateCustomerSettingsRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  adress?: string;
  email?: string;
  lastVisit?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAppointments(customerId: string): Observable<CustomerAppointment[]> {
    return this.http
      .get<CustomerAppointment[]>(API_ROUTES.customerAppointments(customerId))
      .pipe(catchError(() => of([])));
  }

  getHistory(customerId: string): Observable<CustomerAppointment[]> {
    return this.http
      .get<CustomerAppointment[]>(API_ROUTES.customerHistory(customerId))
      .pipe(catchError(() => of([])));
  }

  getCustomerDetails(customerId: string): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(API_ROUTES.customerProfile(customerId));
  }

  updateAppointment(
    customerId: string,
    appointmentId: number,
    request: UpdateAppointmentRequest
  ): Observable<void> {
    return this.http.put<void>(
      API_ROUTES.customerAppointmentUpdate(customerId, appointmentId),
      request
    );
  }

  updateCustomerSettings(
    customerId: string,
    request: UpdateCustomerSettingsRequest
  ): Observable<void> {
    return this.http.put<void>(API_ROUTES.customerSettings(customerId), request);
  }
}
