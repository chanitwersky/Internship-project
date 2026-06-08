import { Routes } from '@angular/router';
import { Login } from '../components/home/login/login';
import { HomePage } from '../components/home/home-page/home-page';

export const router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // דף הבית מפנה ללוגין
  { path: 'login', component: Login },
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

