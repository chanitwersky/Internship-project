import { Routes } from '@angular/router';
import { Login } from '../components/home/login/login';
import { HomePage } from '../components/home/home-page/home-page';

export const router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'customer',
    loadComponent: () => import('./customer-appointments.component').then((m) => m.CustomerAppointmentsComponent),
  },
  {
    path: 'doctor',
    loadComponent: () => import('./doctor-dashboard.component').then((m) => m.DoctorDashboardComponent),
  },
  {
    path: 'doctor/profile',
    loadComponent: () => import('./doctor-profile.component').then((m) => m.DoctorProfileComponent),
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

