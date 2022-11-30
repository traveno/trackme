import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginManagerService } from '../services/login-manager.service';
import { Stat } from '../models/stat.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // Get user stats from db
    this.api.getAllStats().subscribe(results => {
      this.stats = results;
      console.log(results);
    });
  }

  toPrettyDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString();
  }

}
