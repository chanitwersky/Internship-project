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
}
