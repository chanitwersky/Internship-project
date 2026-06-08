import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Appointment {

  private apiUrl = 'https://localhost:3001/api/Doctor';

  constructor(private http: HttpClient) { }

  updateDescription(id: number, description: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/update-description/${id}`,
      description
    );
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments/${id}`);
  }

  finishAppointment(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/finish/${id}`,
      {}
    );
  }

}
