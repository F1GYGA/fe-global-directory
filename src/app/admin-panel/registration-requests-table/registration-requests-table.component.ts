import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { RegistrationRequest, User } from '../../../api/types/user';
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
import { UserService } from '../../../api/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

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
  @Input() usersDataSource: MatTableDataSource<RegistrationRequest> =
    new MatTableDataSource<RegistrationRequest>();
  @Input() userColumns: string[] = [];
  @Input() setLoadingState?: (state: boolean) => void;
  @Output() refreshData = new EventEmitter<void>();
  @ViewChild('registrationRequestsPaginator')
  registrationRequestsPaginator!: MatPaginator;
  @ViewChild('registrationRequestsSort') registrationRequestsSort!: MatSort;

  expandedElement: RegistrationRequest | null = null;
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';

  constructor(
    private datePipe: DatePipe,
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  formatDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd MMMM yyyy') as string;
    } else {
      return 'N/A';
    }
  }

  toggleRow(element: RegistrationRequest) {
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

  approveUser(user: RegistrationRequest) {
    this.setLoadingState?.(true);
    this.userService.approveUser(user.id).subscribe({
      next: (): void => {
        this.refreshData.emit();
        this.snackBar.open('User approved successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'success-snackbar',
        });
      },
      error: (): void => {
        this.snackBar.open('Something went wrong. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        });
      },
      complete: (): void => {
        this.setLoadingState?.(false);
      },
    });
  }

  rejectUser(user: RegistrationRequest): void {
    const dialogRef = this.dialog.open(UserRejectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setLoadingState?.(true);
        const reason = result.reason;
        const description = result.description;
        this.userService.rejectUser(user.id, reason, description).subscribe({
          next: (): void => {
            this.refreshData.emit();
            this.snackBar.open(
              `${user.email} rejected successfully. Reason: ${
                reason ? reason : 'N/A'
              }. Description: ${description ? description : 'N/A'}.`,
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'success-snackbar',
              }
            );
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
