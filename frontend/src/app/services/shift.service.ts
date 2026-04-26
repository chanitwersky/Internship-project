import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private apiUrl = 'http://localhost:8080/api/shifts';

  constructor(private http: HttpClient) { }
    getShiftsByWorkerId(workerId: string): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiUrl}/worker/${workerId}`);
  }
}
