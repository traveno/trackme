import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Stat } from '../models/stat.model';
import { StatsManagerService } from '../services/stats-manager.service';
import { coreDefs, lowerBodyDefs, upperBodyDefs } from '../workout-select/workout-definitions';
import { Exercise } from '../workout-select/workout-select.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];
  userDataValid: boolean = false;

  multi: any[] = [];
  view: [number, number] = [700, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Weight (lbs)';
  timeline: boolean = true;

  constructor(private api: ApiService, public statsManager: StatsManagerService) { }

  async ngOnInit() {
    // Fetch user stats attached to this account and pull
    // results into this component
    await this.statsManager.refreshUserStats();
    let allStats = this.statsManager.getUserStats();

    if (allStats.length >= 2)
      this.userDataValid = true;
    else
      return;

    if (allStats.length <= 10)
      this.stats.push(...allStats);
    else {
      // Get 10 most recent workouts
      for (let i = 10; i > 0; i--)
        this.stats.push(allStats[allStats.length - i]);
    }

    for (let s of this.stats) {
      let defs: Exercise[] = [];

      // Get workout defs based on name stored in DB
      if (s.workout === 'Core')
        defs = coreDefs;
      else if (s.workout === 'Upper Body')
        defs = upperBodyDefs;
      else if (s.workout === 'Lower Body')
        defs = lowerBodyDefs;
      else if (s.workout === 'Glutes')
        defs = lowerBodyDefs;
      else if (s.workout === 'Arms')
        defs = upperBodyDefs;
      else if (s.workout === 'Shoulders')
        defs = upperBodyDefs;
      else if (s.workout === 'Neck')
        defs = upperBodyDefs;
      else
        defs = upperBodyDefs;

      for (let exercise of defs) {
        let exists = this.multi.find(q => q[0].name === exercise.name);

        // If it already exists, we append the data
        // Otherwise, we make a new multi
        if (exists) {
          this.multi[this.multi.indexOf(exists)][0].series.push({
            name: new Date(s.createdAt!).toLocaleDateString(),
            value: Number(s.reps)
          });
        } else {
          this.multi.push([{
            name: exercise.name,
            series: []
          }]);
        }
      }


    }


    // this.multi = [{
    //   name: 'Weight',
    //   series: []
    // }];

    // for (let i = 0; i < this.stats.length; i++) {
    //   this.multi[0].series.push({
    //     name: new Date(this.stats[i].createdAt!).toLocaleDateString(),
    //     value: Number(this.stats[i].weight)
    //   });
    // }

    // console.log(this.multi);
  }

  toPrettyDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString();
  }
}
