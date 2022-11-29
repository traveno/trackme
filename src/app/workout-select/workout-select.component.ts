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

  intensityNames: string[] = ['low', 'medium', 'high'];
  durationNames: string[] = ['15 minutes', '30 minutes', '60 minutes'];

  intensity: number = 1;
  duration: number = 1;
  workout: 'upper' | 'lower' | 'core' = 'upper';
  hasActiveWorkout: boolean = false;

  // For AFTER the user has completed the workout
  weight!: number;

  exercises: Exercise[] = [];

  constructor(private api: ApiService, public loginManager: LoginManagerService, private router: Router) { }

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

  completeWorkout() {
    this.api.createStat({
      userGUID: this.loginManager.user!._id!,
      workout: this.capitalizeFirstLetter(this.workout),
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
