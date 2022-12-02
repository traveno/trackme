import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Stat } from '../models/stat.model';
import { StatsManagerService } from '../services/stats-manager.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];

  constructor(private api: ApiService, public statsManager: StatsManagerService) { }

  ngOnInit(): void {
    // Fetch user stats attached to this account and pull
    // results into this component
    this.statsManager.refreshUserStats();
  }

  toPrettyDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString();
  }

}
