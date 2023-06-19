import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../../../api/types/user';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { UserRejectionDialogComponent } from '../user-rejection-dialog/user-rejection-dialog.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-registration-requests-table',
  templateUrl: './registration-requests-table.component.html',
  styleUrls: ['./registration-requests-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class RegistrationRequestsTableComponent
  implements OnInit, AfterViewInit
{
  @Input() usersDataSource: MatTableDataSource<User> =
    new MatTableDataSource<User>();
  @Input() userColumns: string[] = [];
  @ViewChild('registrationRequestsPaginator')
  registrationRequestsPaginator!: MatPaginator;
  @ViewChild('registrationRequestsSort') registrationRequestsSort!: MatSort;

  expandedElement: User | null = null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  toggleRow(element: User) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.registrationRequestsPaginator;
    this.usersDataSource.sort = this.registrationRequestsSort;
  }

  applyRegistrationRequestsSearch(event: Event) {
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

  approveUser(user: User) {
    alert(`${user.email} approved`);
  }

  rejectUser(user: User): void {
    const dialogRef = this.dialog.open(UserRejectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(
          `${user.email} rejected for reason:`,
          result.selectedReason,
          ', Additional details:',
          result.additionalDetails
        );
      }
    });
  }
}
