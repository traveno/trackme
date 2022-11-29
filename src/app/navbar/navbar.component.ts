import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';
import { DebugModalComponent } from '../modals/debug-modal/debug-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginManager: LoginManagerService, private api: ApiService,
              private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginManager.user = undefined;
    this.router.navigateByUrl('/login');
  }

  openDebugDialog() {
    const modalRef = this.modalService.open(DebugModalComponent);
    modalRef.componentInstance.name = this.loginManager.user?.realname;
  }
}
