import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorAppointment, DoctorService } from '../../app/doctor.service';

/**
 * @deprecated Use DoctorService directly – kept for backward compatibility.
 */
@Injectable({
  providedIn: 'root',
})
export class Appointment {
  constructor(private doctorService: DoctorService) {}

  updateDescription(id: number, description: string): Observable<unknown> {
    return this.doctorService.updateDescription(id, description);
  }

  getAppointmentById(id: number): Observable<DoctorAppointment> {
    return this.doctorService.getAppointmentById(id);
  }

  finishAppointment(id: number): Observable<unknown> {
    return this.doctorService.finishAppointment(id);
  }
}
