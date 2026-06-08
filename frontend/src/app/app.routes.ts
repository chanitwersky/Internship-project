import { Routes } from '@angular/router';
import { Login } from '../components/home/login/login';
import { HomePage } from '../components/home/home-page/home-page';

export const router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // דף הבית מפנה ללוגין
  { path: 'login', component: Login },
//   { path: 'doctor-home', component: HomePage }, 
//   { path: 'patient-home', component: HomePage },
];

