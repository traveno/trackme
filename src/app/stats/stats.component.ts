import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';
import { Stat } from '../models/stat.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];

  constructor(private loginManager: LoginManagerService, private api: ApiService) { }

  ngOnInit(): void {
    // Get user stats from db
    this.api.getAllStats(this.loginManager.user?._id!).subscribe(results => {
      this.stats = results;
      console.log(results);
    });
  }

  toPrettyDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString();
  }

}
