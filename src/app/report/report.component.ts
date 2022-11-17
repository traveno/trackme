import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public loginManager: LoginManagerService) { }

  ngOnInit(): void {
  }

}
