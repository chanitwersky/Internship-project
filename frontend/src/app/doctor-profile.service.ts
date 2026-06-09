import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, timeout } from 'rxjs';
import { API_ROUTES } from './api-routes';

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
}

export interface UpdateDoctorProfileRequest {
  name: string;
  specialty: string;
}

/** DoctorsController – GET/PUT {apiBaseUrl}/api/doctors/{doctorId}/profile */
@Injectable({
  providedIn: 'root',
})
export class DoctorProfileService {
  constructor(private http: HttpClient) {}

  getProfile(doctorId: string): Observable<DoctorProfile> {
    const id = doctorId.trim();
    if (!id) {
      throw new Error('Doctor ID is required for profile API call');
    }

    return this.http
      .get<DoctorProfile>(API_ROUTES.doctorProfile(id))
      .pipe(
        timeout(15_000),
        map((profile) => ({
          id: profile.id ?? (profile as { Id?: string }).Id ?? id,
          name: profile.name ?? (profile as { Name?: string }).Name ?? '',
          specialty:
            profile.specialty ?? (profile as { Specialty?: string }).Specialty ?? '',
        }))
      );
  }

  updateProfile(
    doctorId: string,
    request: UpdateDoctorProfileRequest
  ): Observable<void> {
    const id = doctorId.trim();
    if (!id) {
      throw new Error('Doctor ID is required for profile API call');
    }

    return this.http
      .put<void>(API_ROUTES.doctorProfile(id), request)
      .pipe(timeout(15_000));
  }
}
