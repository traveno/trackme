import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-select',
  templateUrl: './workout-select.component.html',
  styleUrls: ['./workout-select.component.css']
})
export class WorkoutSelectComponent implements OnInit {

  intensityNames: string[] = ['low', 'medium', 'high'];
  durationNames: string[] = ['15 minutes', '30 minutes', '60 minutes'];

  intensity: number = 1;
  duration: number = 1;
  hasActiveWorkout: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
