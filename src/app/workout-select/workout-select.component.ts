import { Component, OnInit } from '@angular/core';
import { coreDefs, lowerBodyDefs, upperBodyDefs } from './workout-definitions';


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
    else if (this.workout === 'lower')
      this.exercises = lowerBodyDefs;
    else if (this.workout === 'core')
      this.exercises = coreDefs;

    this.hasActiveWorkout = true;
  }

}
