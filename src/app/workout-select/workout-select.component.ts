import { Component, OnInit } from '@angular/core';
import { upperBodyDefs } from './workout-definitions';


export interface Exercise {
  name: string,
  image: string,
  sets: number,
  reps: number
}

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
  workout: 'upper' | 'lower' | 'core' = 'upper';
  hasActiveWorkout: boolean = false;

  exercises: Exercise[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  generateWorkout() {
    if (this.workout === 'upper')
      this.exercises = upperBodyDefs;

    this.hasActiveWorkout = true;
  }

}
