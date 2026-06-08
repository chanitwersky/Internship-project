import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Mirrors Dal.Models.Queue / QueueHistory JSON shape.
 * ASP.NET Core serializes C# PascalCase properties to camelCase in API responses.
 */
export interface CustomerAppointment {
  id: number;
  workerId: string;
  customerId: string;
  treatmentDescription: string;
  date: string;
}

/** Mirrors Dal.Models.Customer JSON shape. */
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
  customerId?: string;
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

export interface CompleteAppointmentRequest {
  appointmentId: number;
  customerId: string;
  treatmentDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  private handleError(operation: string) {
    return (error: unknown) => {
      console.error(`[CustomerService] ${operation} failed`, error);
      return throwError(() => error);
    };
  }

  getAppointments(customerId: string): Observable<CustomerAppointment[]> {
    return this.http
      .get<CustomerAppointment[]>(`${this.apiUrl}/appointments/client/${customerId}`)
      .pipe(catchError(this.handleError('getAppointments')));
  }

  getHistory(customerId: string): Observable<CustomerAppointment[]> {
    return this.http
      .get<CustomerAppointment[]>(`${this.apiUrl}/history/client/${customerId}`)
      .pipe(catchError(this.handleError('getHistory')));
  }

  getCustomerDetails(customerId: string): Observable<CustomerDetails> {
    return this.http
      .get<CustomerDetails>(`${this.apiUrl}/clients/${customerId}`)
      .pipe(catchError(this.handleError('getCustomerDetails')));
  }

  createAppointment(
    customerId: string,
    request: UpdateAppointmentRequest
  ): Observable<CustomerAppointment> {
    return this.http
      .post<CustomerAppointment>(`${this.apiUrl}/customer/appointments/${customerId}`, request)
      .pipe(catchError(this.handleError('createAppointment')));
  }

  updateAppointment(
    customerId: string,
    appointmentId: number,
    request: UpdateAppointmentRequest
  ): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/appointments/update/${appointmentId}`, {
        ...request,
        customerId,
      })
      .pipe(catchError(this.handleError('updateAppointment')));
  }

  updateCustomerSettings(
    customerId: string,
    request: UpdateCustomerSettingsRequest
  ): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/clients/${customerId}`, request)
      .pipe(catchError(this.handleError('updateCustomerSettings')));
  }

  completeAppointment(request: CompleteAppointmentRequest): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/appointments/complete`, request)
      .pipe(catchError(this.handleError('completeAppointment')));
  }
}
