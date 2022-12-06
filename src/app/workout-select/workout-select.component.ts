import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ApiService } from '../services/api.service';
import { LoginManagerService } from '../services/login-manager.service';
import { coreDefs, lowerBodyDefs, upperBodyDefs } from './workout-definitions';

export interface Exercise {
  name: string,
  image: string,
  sets: number,
  reps: number
}

export interface Workout {
  name: string,
  exercises: Exercise[],
  intensity: number,
  duration: number
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
  workoutDesc: string[] = [
    'The upper body workout targets the delts, biceps, triceps, shoulders, neck and back.',
    'The lower body workout targets the calves, hamstrings, quads, and glutes.',
    'The core workout specifically targets the abdomen, or the abs.',
    'The glutes workout specifically targets the gluteus maximus muscles.',
    'The arms workout specifically targets the biceps, triceps and forearms.',
    'The shoulders workout specifically targets the shoulder muscles, primarily using the shrugs exercise.',
    'The neck workout specifically targets the muscles within the neck.'
  ];

  searchText: string = '';
  searchActive: boolean = false;
  searchResults: number[] = [];

  workoutPlan: Workout[] = [];

  intensity: number = 0;
  duration: number = 1;
  workout: number = 0;
  hasActiveWorkout: boolean = false;

  totalWorkoutTime: number = 0; // default 10 minutes

  // For AFTER the user has completed the workout
  weight!: number;

  constructor(private api: ApiService, public loginManager: LoginManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  searchChange() {
    // Clear search results
    this.searchResults = [];

    if (this.searchText === '')
      this.searchActive = false;
    else
      this.searchActive = true;

    // First search workout names
    for (let w of this.workoutNames) {
      if (w.toLowerCase().includes(this.searchText.toLowerCase()))
        this.searchResults.push(this.workoutNames.indexOf(w));
    }

    // Second search workout descriptions
    for (let d of this.workoutDesc) {
      if (d.toLowerCase().includes(this.searchText.toLowerCase()))
        this.searchResults.push(this.workoutDesc.indexOf(d));
    }
  }

  appendWorkout() {
    let defs: Exercise[] = [];
    if (this.workout === 0)
      defs = upperBodyDefs;
    else if (this.workout === 1)
      defs = lowerBodyDefs;
    else if (this.workout === 2)
      defs = coreDefs;
    else if (this.workout === 3)
      defs = lowerBodyDefs;
    else if (this.workout === 4)
      defs = upperBodyDefs;
    else if (this.workout === 5)
      defs = upperBodyDefs;
    else if (this.workout === 6)
      defs = upperBodyDefs;

    this.workoutPlan.push({
      name: this.workoutNames[this.workout],
      exercises: defs,
      intensity: this.intensity,
      duration: this.duration
    });
  }

  getAllExercises(): Exercise[] {
    let results: Exercise[] = [];

    for (let workout of this.workoutPlan) {
      results.push(...workout.exercises);
    }

    return results;
  }

  beginWorkout() {
    this.hasActiveWorkout = true;
    
    for (let workout of this.workoutPlan) {
      if (workout.duration === 0)
        this.totalWorkoutTime += 15 * 60;
      else if (workout.duration === 1)
        this.totalWorkoutTime += 30 * 60;
      else if (workout.duration === 2)
        this.totalWorkoutTime += 60 * 60;
    }

    // Round total workout if it's not a whole number
    this.totalWorkoutTime = Math.floor(this.totalWorkoutTime);
  }

  completeWorkout() {
    for (let workout of this.workoutPlan) {
      this.api.createStat({
        userGUID: this.loginManager.user!._id!,
        workout: this.capitalizeFirstLetter(this.workoutNames[this.workout]),
        reps: (workout.exercises[0].sets + this.intensity) * (workout.exercises[0].reps * this.duration),
        weight: this.weight ?? this.loginManager.user?.weight
      }).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
    this.router.navigateByUrl('/home');
  }

  capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

}
