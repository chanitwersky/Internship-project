import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ShiftService } from '../../../services/shift.service'; 

@Component({
  selector: 'app-worker',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './worker.html',
  styleUrl: './worker.css',
})
export class Worker implements OnInit {
  shifts: any[] = [];
  workerId: string = '123'; 

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.loadShifts();
  } 

  loadShifts(): void {
    
    this.shiftService.getShiftsByWorkerId(this.workerId).subscribe({
      next: (data) => {
        this.shifts = data;
        console.log('Shifts loaded:', this.shifts);
      },
      error: (error) => {
        console.error('Error fetching shifts:', error);
      }
    }); 
  }
}