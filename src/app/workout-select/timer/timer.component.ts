import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Exercise } from '../workout-select.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input()
  exercises: Exercise[] = [];

  @Input()
  totalWorkoutTime: number = 60;

  timePerWorkout: number = 60 // default 60 seconds

  currentExercise: number = 0; // position in array
  currentExerciseTimeRemaining: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.exercises, this.exercises.length,this.totalWorkoutTime);
    this.timePerWorkout = this.totalWorkoutTime / this.exercises.length; 

    // Set up first workout
    this.currentExerciseTimeRemaining = this.timePerWorkout;
    interval(1000).subscribe(e => { this.updateTimer() });
  }

  updateTimer() {
    this.currentExerciseTimeRemaining--;

    // Check if we've completed all workouts
    if (this.currentExercise === this.exercises.length - 1 &&
        this.currentExerciseTimeRemaining < 0) {
      this.currentExerciseTimeRemaining = 0;
      return;
    }

    // If current exercise is complete
    if (this.currentExerciseTimeRemaining <= 0) {
      this.currentExerciseTimeRemaining = this.timePerWorkout;
      this.currentExercise++;
    }
  }

  toPrettyTime(time: number) {
    if (time % 60 >= 10)
      return `${parseInt(`${time / 60}`)}:${time % 60}`;
    else
      return `${parseInt(`${time / 60}`)}:0${time % 60}`; 
  }

  skipCurrentWorkout() {
    // If we've completed all workouts, do not skip
    if (this.currentExercise >= this.exercises.length - 1)
      return;

    // Advance to next workout
    this.currentExercise++;
    this.currentExerciseTimeRemaining = this.timePerWorkout;
  }
}
