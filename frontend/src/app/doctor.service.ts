import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DoctorAppointment {
  id: number;
  workerId: string;
  customerId: string;
  treatmentDescription: string;
  date: string;
}

export interface WeeklyShift {
  id: number;
  day: string;
  checkInTime: string;
  endTime: string;
}

export interface DoctorPatient {
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  lastVisit: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = '/api/doctor';

  constructor(private http: HttpClient) {}

  getTodayAppointments(doctorId: string): Observable<DoctorAppointment[]> {
    return this.http.get<DoctorAppointment[]>(`${this.baseUrl}/${doctorId}/appointments/today`);
  }

  getWeeklySchedule(doctorId: string): Observable<WeeklyShift[]> {
    return this.http.get<WeeklyShift[]>(`${this.baseUrl}/${doctorId}/schedule/week`);
  }

  getPatients(doctorId: string): Observable<DoctorPatient[]> {
    return this.http.get<DoctorPatient[]>(`${this.baseUrl}/${doctorId}/patients`);
  }
}
