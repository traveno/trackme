import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { LoginManagerService } from 'src/app/services/login-manager.service';
import { StatsManagerService } from 'src/app/services/stats-manager.service';
import { WorkoutSelectComponent } from 'src/app/workout-select/workout-select.component';

@Component({
  selector: 'app-debug-modal',
  templateUrl: './debug-modal.component.html',
  styleUrls: ['./debug-modal.component.css']
})
export class DebugModalComponent implements OnInit {
  @Input() name!: string;

  statusText: string = '';

  workoutNames: string[] = ['Upper Body', 'Lower Body', 'Core', 'Glutes', 'Arms', 'Shoulders', 'Neck'];

  constructor(public loginManager: LoginManagerService, 
              private statsManager: StatsManagerService, 
              private router: Router,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteMyStats() {

    this.statsManager.deleteAllUserStats();

    // this.api.deleteMyStats().subscribe(results => {
    //   console.log('Deleted', results);
    //   this.statusText = `Deleted ${results.deletedCount} entries from DB`;
    // });
  }

  generateFakeStats() {
    // Find date from 90 days ago
    let beginDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
    let beginWeight = this.loginManager.user?.weight!;

    for (let i = 0; i < 120; i++) {
      let insertionDate = new Date(beginDate.getTime() + i * 24 * 60 * 60 * 1000);
      console.log(insertionDate);

      if (Math.random() > 0.75) {
        beginWeight += Math.random() * 0.1;
      } else {
        beginWeight -= Math.random() * 0.25;
      }

      this.statsManager.createUserStat({
        createdAt: insertionDate,
        userGUID: this.loginManager.user?._id!,
        reps: 12 + Math.floor(i * 0.5 + Math.floor(Math.random() * 3)),
        workout: this.workoutNames[Math.floor(Math.random() * this.workoutNames.length)],
        weight: Number(beginWeight.toFixed(2))
      });
    }

    console.log(new Date(beginDate).toLocaleDateString());
  }

  deleteMyAccount() {
    // this.api.deleteMyAccount().subscribe(results => {
    //   console.log('Deleted', results);
    //   this.loginManager.user = undefined;
    //   this.router.navigateByUrl('/login');
    //   this.activeModal.close();
    // });
  }
}
