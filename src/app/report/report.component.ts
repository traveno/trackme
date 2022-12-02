import { Component, OnInit } from '@angular/core';
import { Stat } from '../models/stat.model';
import { LoginManagerService } from '../services/login-manager.service';
import { StatsManagerService } from '../services/stats-manager.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  stats: Stat[] = [];

  multi!: any[];
  view: [number, number] = [700, 500];

  userDataValid: boolean = false;

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

  constructor(public loginManager: LoginManagerService, public statsManager: StatsManagerService) { }

  async ngOnInit() {
    await this.statsManager.refreshUserStats();
    this.stats = this.statsManager.getUserStats();

    if (new Date(this.stats[0].createdAt!).getTime() < (new Date().getTime() - 90 * 24 * 60 * 60 * 1000)) {
      this.userDataValid = true;
    }

    this.multi = [{
      name: 'Weight',
      series: []
    }];

    for (let i = 0; i < this.stats.length; i++) {
      this.multi[0].series.push({
        name: new Date(this.stats[i].createdAt!).toLocaleDateString(),
        value: Number(this.stats[i].weight)
      });
    }

    console.log(this.multi);
  }

}
