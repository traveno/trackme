import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { LoginManagerService } from 'src/app/services/login-manager.service';

@Component({
  selector: 'app-debug-modal',
  templateUrl: './debug-modal.component.html',
  styleUrls: ['./debug-modal.component.css']
})
export class DebugModalComponent implements OnInit {
  @Input() name!: string;

  statusText: string = '';

  constructor(public loginManager: LoginManagerService, private api: ApiService,
    public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void {
  }

  deleteMyStats() {
    this.api.deleteMyStats(this.loginManager.user?._id!).subscribe(results => {
      console.log('Deleted', results);
      this.statusText = `Deleted ${results.deletedCount} entries from DB`;
    });
  }

  deleteMyAccount() {
    this.api.deleteMyAccount(this.loginManager.user?._id!).subscribe(results => {
      console.log('Deleted', results);
      this.loginManager.user = undefined;
      this.router.navigateByUrl('/login');
      this.activeModal.close();
    });
  }
}
