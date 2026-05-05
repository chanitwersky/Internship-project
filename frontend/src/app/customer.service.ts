import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private baseUrl = '/api/customer';

  constructor(private http: HttpClient) {}

  getAppointments(customerId: string): Observable<CustomerAppointment[]> {
    return this.http.get<CustomerAppointment[]>(`${this.baseUrl}/appointments/${customerId}`);
  }

  getHistory(customerId: string): Observable<CustomerAppointment[]> {
    return this.http.get<CustomerAppointment[]>(`${this.baseUrl}/history/${customerId}`);
  }

  getCustomerDetails(customerId: string): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(`${this.baseUrl}/${customerId}`);
  }

  updateAppointment(
    customerId: string,
    appointmentId: number,
    request: UpdateAppointmentRequest
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/appointments/${customerId}/${appointmentId}`, request);
  }

  updateCustomerSettings(
    customerId: string,
    request: UpdateCustomerSettingsRequest
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/settings/${customerId}`, request);
  }
}
