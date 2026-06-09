import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api-routes';

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
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  /** GET http://localhost:5141/api/Doctor/{doctorId}/appointments/today (requires Doctor JWT) */
  getTodayAppointments(doctorId: string): Observable<DoctorAppointment[]> {
    return this.http.get<DoctorAppointment[]>(
      API_ROUTES.doctorAppointmentsToday(doctorId.trim())
    );
  }

  /** GET http://localhost:5141/api/Doctor/{doctorId}/shifts (requires Doctor JWT) */
  getWeeklySchedule(doctorId: string): Observable<WeeklyShift[]> {
    return this.http.get<WeeklyShift[]>(API_ROUTES.doctorShifts(doctorId.trim()));
  }

  /** GET http://localhost:5141/api/Doctor/{doctorId}/patients (requires Doctor JWT) */
  getPatients(doctorId: string): Observable<DoctorPatient[]> {
    return this.http.get<DoctorPatient[]>(API_ROUTES.doctorPatients(doctorId.trim()));
  }

  /** GET http://localhost:5141/api/Doctor/appointments/{appointmentId} */
  getAppointmentById(appointmentId: number): Observable<DoctorAppointment> {
    return this.http.get<DoctorAppointment>(API_ROUTES.doctorAppointmentById(appointmentId));
  }

  /** PATCH http://localhost:5141/api/Doctor/update-description/{appointmentId} */
  updateDescription(appointmentId: number, description: string): Observable<unknown> {
    return this.http.patch(
      API_ROUTES.doctorUpdateDescription(appointmentId),
      JSON.stringify(description),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  /** POST http://localhost:5141/api/Doctor/finish/{appointmentId} */
  finishAppointment(appointmentId: number): Observable<unknown> {
    return this.http.post(API_ROUTES.doctorFinishAppointment(appointmentId), {});
  }
}
