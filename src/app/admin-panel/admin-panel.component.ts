import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  inactiveUsers,
  registrationRequests,
  users,
} from '../../helpers/constants/usersMock';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  registrationRequestsColumns: string[] = [
    'profilePhotoUrl',
    'firstName',
    'lastName',
    'email',
    'expand',
  ];
  userColumns: string[] = [
    'profilePhotoUrl',
    'firstName',
    'lastName',
    'email',
    'actions',
  ];

  registrationRequestsDataSource = new MatTableDataSource(registrationRequests);
  activeUsersDataSource = new MatTableDataSource(users);
  inactiveUsersDataSource = new MatTableDataSource(inactiveUsers);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe(result => {
        if (result.matches) {
          this.registrationRequestsColumns = [
            'profilePhotoUrl',
            'email',
            'expand',
          ];
          this.userColumns = ['profilePhotoUrl', 'email', 'actions'];
        } else {
          this.registrationRequestsColumns = [
            'profilePhotoUrl',
            'firstName',
            'lastName',
            'email',
            'expand',
          ];
          this.userColumns = [
            'profilePhotoUrl',
            'firstName',
            'lastName',
            'email',
            'actions',
          ];
        }
      });
  }
}
