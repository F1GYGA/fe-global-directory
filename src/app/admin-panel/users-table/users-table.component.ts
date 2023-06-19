import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
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
  @ViewChild('usersPaginator') usersPaginator!: MatPaginator;
  @ViewChild('usersSort') usersSort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
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

  deactivateUser(user: User) {
    const dialogRef = this.dialog.open(
      DeactivateUserConfirmationDialogComponent,
      {
        data: { user: user.email },
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(`${user.email} deactivated`);
      }
    });
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
        alert(`${user.email} activated`);
      }
    });
  }
}
