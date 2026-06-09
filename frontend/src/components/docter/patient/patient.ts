import { Component } from '@angular/core';
import { Appointment } from '../../../services/oppointment/appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-patient',
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {
  appointmentId: number = 0;
  workerId: string = '';
  customerId: string = '';
  description: string = '';
  date: string = '';

  constructor(
    private appointmentService: Appointment,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.appointmentId = Number(params['id']);
      this.getAppointment();
    });
    
  }

  getAppointment() {

    this.appointmentService
      .getAppointmentById(this.appointmentId)
      .subscribe({
        next: (appointment: any) => {
          this.workerId = appointment.workerId;
          this.customerId = appointment.customerId;
          this.date = appointment.date;
        },
        error: (err: any) => {
          console.log(err);
          alert('Error getting appointment details');
        }
      });
  }

   saveDescription() {

    this.appointmentService
      .updateDescription(
        this.appointmentId,
        this.description
      )
      .subscribe({

        next: (response:any) => {

          alert('Description saved');
        },

        error: (err:any) => {

          console.log(err);

          alert('Error saving description');
        }
      });
  }

  finishAppointment() {

  this.appointmentService
    .finishAppointment(this.appointmentId)
    .subscribe({

      next: () => {
        this.router.navigate(['/doctor']);
      },

      error: (err: any) => {
        console.log(err);
        alert("שגיאה בסיום טיפול");
      }

    });
  }

  
}


