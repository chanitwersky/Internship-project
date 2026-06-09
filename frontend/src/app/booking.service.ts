import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes';

export interface DoctorListItem {
  id: string;
  name: string;
  specialty: string;
}

export function formatDoctorOption(doctor: DoctorListItem): string {
  return `${doctor.name} - ${doctor.specialty}`;
}

export interface AvailabilityResponse {
  doctorId: string;
  date: string;
  slots: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<DoctorListItem[]> {
    return this.http.get<DoctorListItem[]>(API_ROUTES.doctorsList);
  }

  getAvailability(doctorId: string, date: string): Observable<AvailabilityResponse> {
    const params = new HttpParams().set('doctorId', doctorId).set('date', date);
    return this.http.get<AvailabilityResponse>(API_ROUTES.customerBookingAvailability, {
      params,
    });
  }
}
