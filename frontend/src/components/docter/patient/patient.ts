import { Component } from '@angular/core';
import { DoctorService } from '../../../app/doctor.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private doctorService: DoctorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.appointmentId = params['id'];
      this.getAppointment();
    });
    
  }

  getAppointment() {

    this.doctorService
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

    this.doctorService
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

  this.doctorService
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


