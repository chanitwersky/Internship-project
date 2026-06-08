import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../services/oppointment/appointment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [FormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {
  appointmentId: string = '';
  workerId: string = '';
  customerId: string = '';
  description: string = '';
  date: string = '';

  constructor(private appointmentService: Appointment, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.appointmentId = params['id'];
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
        alert("התור הסתיים והועבר להיסטוריה");
      },

      error: (err: any) => {
        console.log(err);
        alert("שגיאה בסיום טיפול");
      }

    });
  }

  
}


