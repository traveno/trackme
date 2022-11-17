import { Component, OnInit } from '@angular/core';


interface Exercise {
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
    this.exercises.push({
      name: 'Bench Press',
      image: 'bench_press.png',
      sets: 3,
      reps: 8
    });

    this.exercises.push({
      name: 'Delt Press',
      image: 'delt_press.png',
      sets: 3,
      reps: 8
    });

    this.exercises.push({
      name: 'Tricep Extension',
      image: 'tricep_extension.png',
      sets: 3,
      reps: 8
    });

    this.hasActiveWorkout = true;
  }

}
