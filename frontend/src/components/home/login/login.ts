import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


import { Auth } from '../../../services/auth/auth'; 
@Component({
  selector: 'app-login',
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  loginForm = new FormGroup({
    id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onLogin() {
    console.log("לחצתי על התחבר");

    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {

    if (res.userType === 'Doctor') {
      this.router.navigate(['/doctor-home']);
    }
    else {
      this.router.navigate(['/patient-home']);
    }
  }
  });
  }
}
