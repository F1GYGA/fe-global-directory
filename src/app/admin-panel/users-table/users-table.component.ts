import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../api/types/user';
import { MatDialog } from '@angular/material/dialog';
import { DeactivateUserConfirmationDialogComponent } from '../deactivate-user-confirmation-dialog/deactivate-user-confirmation-dialog.component';
import { ActivateUserConfirmationDialogComponent } from '../activate-user-confirmation-dialog/activate-user-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../api/services/user/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @Input() activeUsers: boolean = true;
  @Input() usersDataSource: MatTableDataSource<User> =
    new MatTableDataSource<User>();
  @Input() userColumns: string[] = [];
  @Input() setLoadingState?: (state: boolean) => void;
  @Output() refreshData = new EventEmitter<void>();
  @ViewChild('usersPaginator') usersPaginator!: MatPaginator;
  @ViewChild('usersSort') usersSort!: MatSort;

  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.usersPaginator;
    this.usersDataSource.sort = this.usersSort;
  }

  applyUsersSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = searchValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewUser(user: User) {
    alert(`View ${user.email}`);
  }

  activateUser(user: User) {
    const dialogRef = this.dialog.open(
      ActivateUserConfirmationDialogComponent,
      {
        data: { user: user.email },
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setLoadingState?.(true);
        this.userService.activateUser(user.id).subscribe({
          next: (): void => {
            this.refreshData.emit();
            this.snackBar.open('User activated successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
            });
          },
          error: (): void => {
            this.snackBar.open(
              'Something went wrong. Please try again.',
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
            this.setLoadingState?.(false);
          },
        });
      }
    });
  }

  deactivateUser(user: User) {
    const dialogRef = this.dialog.open(
      DeactivateUserConfirmationDialogComponent,
      {
        data: { user: user.email },
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setLoadingState?.(true);
        this.userService.inactivateUser(user.id).subscribe({
          next: (): void => {
            this.refreshData.emit();
            this.snackBar.open('User deactivated successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
            });
          },
          error: (): void => {
            this.snackBar.open(
              'Something went wrong. Please try again.',
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
            this.setLoadingState?.(false);
          },
        });
      }
    });
  }
}
