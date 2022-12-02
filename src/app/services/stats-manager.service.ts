import { Injectable } from '@angular/core';
import { Stat } from '../models/stat.model';
import { ApiService } from './api.service';
import { LoginManagerService } from './login-manager.service';

@Injectable({
  providedIn: 'root'
})
export class StatsManagerService {

  stats: Stat[] = [];

  constructor(private api: ApiService, private loginManager: LoginManagerService) { }

  createUserStat(data: Stat) {
    // DATA OBJECT MUST CONTAIN:
    // {
    //   userGUID: string;
    //   workout: string;
    //   weight: number;
    //   createdAt: Date
    // }

    // Create new stat for current user
    this.api.createStat({
      createdAt: data.createdAt,
      userGUID: this.loginManager.user?._id!,
      workout: data.workout,
      weight: data.weight,
    }).subscribe(result => {
      console.log(result);
    });

    // Refresh our list of stats
    this.refreshUserStats();
  }

  getUserStats(): Stat[] {
    return this.stats;
  }

  refreshUserStats() {
    return new Promise<void>(resolve => {
      if (!this.loginManager.isLoggedIn()) {
        console.log('Attempted to pull stats when no one is logged in!');
        return;
      }
  
      // Get all stats and store them locally
      this.api.getAllStatsByUserGUID(this.loginManager.user?._id!).subscribe(stats => {
        console.log('retrieved stats', stats);
        this.stats = stats.sort((a, b) => {return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()});
        resolve();
      });
    });
  }

  deleteAllUserStats() {
    if (!this.loginManager.isLoggedIn()) {
      console.log('Attempted to delete stats when no one is logged in!');
      return;
    }

    // Delete all user stats
    this.api.deleteAllStats(this.loginManager.user?._id!).subscribe(result => {
      console.log(result);
    });

    // Refresh local stats
    this.refreshUserStats();
  }
}
