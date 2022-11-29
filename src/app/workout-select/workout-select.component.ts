import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';
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

  intensityNames: string[] = ['Low', 'Medium', 'High'];
  durationNames: string[] = ['15 minutes', '30 minutes', '60 minutes'];
  workoutNames: string[] = ['Upper Body', 'Lower Body', 'Core', 'Glutes', 'Arms', 'Shoulders', 'Neck'];

  intensity: number = 0;
  duration: number = 1;
  workout: number = 0;
  hasActiveWorkout: boolean = false;

  // For AFTER the user has completed the workout
  weight!: number;

  exercises: Exercise[] = [];

  constructor(private api: ApiService, public loginManager: LoginManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  generateWorkout() {
    if (this.workout === 0)
      this.exercises = upperBodyDefs;
    else if (this.workout === 1)
      this.exercises = lowerBodyDefs;
    else if (this.workout === 2)
      this.exercises = coreDefs;

    this.hasActiveWorkout = true;
  }

  completeWorkout() {
    this.api.createStat({
      userGUID: this.loginManager.user!._id!,
      workout: this.capitalizeFirstLetter(this.workoutNames[this.workout]),
      weight: this.weight ?? this.loginManager.user?.weight
    }).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });

    this.router.navigateByUrl('/home');
  }

  capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

}
