import { Component, OnInit } from '@angular/core';
import { Stat } from '../models/stat.model';
import { LoginManagerService } from '../services/login-manager.service';
import { StatsManagerService } from '../services/stats-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stats: Stat[] = [];

  constructor(public loginManager: LoginManagerService, public statsManager: StatsManagerService) { }

  async ngOnInit() {
    // Fetch user stats attached to this account and pull
    // results into this component
    await this.statsManager.refreshUserStats();
    let allStats = this.statsManager.getUserStats();

    this.stats = allStats.filter(q => new Date(q.createdAt!).getTime() >= (new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).reverse();
  }

  toPrettyDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString();
  }
}
