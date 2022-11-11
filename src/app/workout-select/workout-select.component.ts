import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-select',
  templateUrl: './workout-select.component.html',
  styleUrls: ['./workout-select.component.css']
})
export class WorkoutSelectComponent implements OnInit {


  intensity: number = 1;
  duration: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
