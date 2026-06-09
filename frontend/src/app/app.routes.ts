import { Routes } from '@angular/router';
import { Login } from '../components/home/login/login';
import { Patient } from '../components/docter/patient/patient';

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
    path: 'doctor/patient/:id',
    component: Patient,
  },
  {
    path: 'doctor/patients',
    loadComponent: () => import('./doctor-patients.component').then((m) => m.DoctorPatientsComponent),
  },
  {
    path: 'doctor/patient-history/:patientId',
    loadComponent: () => import('./doctor-patient-history.component').then((m) => m.DoctorPatientHistoryComponent),
  },
];
