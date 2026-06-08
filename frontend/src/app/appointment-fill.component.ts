import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-fill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-fill.html',
  styleUrls: ['./appointment-fill.css'],
})
export class AppointmentFillComponent {
  private route = inject(ActivatedRoute);
  appointmentId: number | null = null;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointmentId = id ? Number(id) : null;
  }
}
