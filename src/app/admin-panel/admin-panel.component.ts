import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../../api/services/user/user.service';
import { RegistrationRequest, User } from '../../api/types/user';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';

enum TabIndexes {
  REGISTRATION_REQUESTS = 0,
  ACTIVE_USERS = 1,
  INACTIVE_USERS = 2,
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  registrationRequestsColumns: string[] = [
    'profilePhoto',
    'firstName',
    'lastName',
    'email',
    'expand',
  ];
  userColumns: string[] = [
    'profilePhoto',
    'firstName',
    'lastName',
    'email',
    'actions',
  ];

  isLoading: boolean = false;
  selectedTabIndex = TabIndexes.REGISTRATION_REQUESTS;
  registrationRequestsDataSource = new MatTableDataSource<RegistrationRequest>(
    []
  );
  activeUsersDataSource = new MatTableDataSource<User>([]);
  inactiveUsersDataSource = new MatTableDataSource<User>([]);

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {}

  loadRegistrationRequests() {
    this.isLoading = true;
    this.userService.getRegistrationRequests().subscribe({
      next: data => {
        this.registrationRequestsDataSource.data = data;
      },
      error: () => {
        this.snackBar.open(
          'There was an error while loading data from the server.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  loadActiveUsers() {
    this.isLoading = true;
    this.userService.getActiveUsers().subscribe({
      next: data => {
        this.activeUsersDataSource.data = data;
      },
      error: () => {
        this.snackBar.open(
          'There was an error while loading data from the server.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  loadInactiveUsers() {
    this.isLoading = true;
    this.userService.getInactiveUsers().subscribe({
      next: data => {
        this.inactiveUsersDataSource.data = data;
      },
      error: () => {
        this.snackBar.open(
          'There was an error while loading data from the server.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
    this.loadDataBasedOnTab(event.index);
    localStorage.setItem('selectedTabIndex', event.index.toString());
  }

  loadDataBasedOnTab(tabIndex: TabIndexes) {
    switch (tabIndex) {
      case TabIndexes.REGISTRATION_REQUESTS:
        this.loadRegistrationRequests();
        break;
      case TabIndexes.ACTIVE_USERS:
        this.loadActiveUsers();
        break;
      case TabIndexes.INACTIVE_USERS:
        this.loadInactiveUsers();
        break;
    }
  }

  ngOnInit() {
    const storedTabIndex = localStorage.getItem('selectedTabIndex');
    if (storedTabIndex !== null) {
      this.selectedTabIndex = +storedTabIndex;
    }
    this.loadDataBasedOnTab(this.selectedTabIndex);
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe(result => {
        if (result.matches) {
          this.registrationRequestsColumns = [
            'profilePhoto',
            'email',
            'expand',
          ];
          this.userColumns = ['profilePhoto', 'email', 'actions'];
        } else {
          this.registrationRequestsColumns = [
            'profilePhoto',
            'firstName',
            'lastName',
            'email',
            'expand',
          ];
          this.userColumns = [
            'profilePhoto',
            'firstName',
            'lastName',
            'email',
            'actions',
          ];
        }
      });
  }
}
