import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: 'customer',
    loadComponent: () => import('./customer-appointments.component').then((m) => m.CustomerAppointmentsComponent),
  },
  {
    path: 'doctor',
    loadComponent: () => import('./doctor-dashboard.component').then((m) => m.DoctorDashboardComponent),
    // TODO: add a doctor guard here once authentication is available
    // canActivate: [DoctorAuthGuard],
  },
  {
    path: 'doctor/appointment-fill/:id',
    loadComponent: () => import('./appointment-fill.component').then((m) => m.AppointmentFillComponent),
  },
  {
    path: 'doctor/patients',
    loadComponent: () => import('./doctor-patients.component').then((m) => m.DoctorPatientsComponent),
  },
];
