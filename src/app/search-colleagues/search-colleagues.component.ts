import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { UserService } from 'src/api/services/user/user.service';
import { User } from 'src/api/types/user';
import { catchError, startWith, switchMap } from 'rxjs/operators';

export interface UserFilterResult {
  size: number;
  numberOfPage: number;
  userProfileDTOS: User[];
}

@Component({
  selector: 'app-search-colleagues',
  templateUrl: './search-colleagues.component.html',
  styleUrls: ['./search-colleagues.component.css'],
})
export class SearchColleaguesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'profilePhotoUrl',
    'firstName',
    'lastName',
    'email',
    'department',
    'team',
    'jobTitle',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: User[] = [];
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';
  searchKeywordFilter = new FormControl();
  pageSizes = [5, 10, 25, 50, 100];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent!: PageEvent;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.searchKeywordFilter.valueChanges.subscribe(() =>
      this.paginator.firstPage()
    );
    merge(this.searchKeywordFilter.valueChanges, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const filterValue =
            this.searchKeywordFilter.value == null
              ? ''
              : this.searchKeywordFilter.value;
          return this.userService
            .getFilteredUsers(
              filterValue,
              this.pageEvent ? this.pageEvent.pageSize : 5,
              this.pageEvent
                ? this.pageEvent.pageIndex * this.pageEvent.pageSize
                : 0
            )
            .pipe(catchError(() => observableOf(null)));
        })
      )
      .subscribe(data => {
        this.data = data?.userProfileDTOS ? data.userProfileDTOS : [];
        this.resultsLength = data?.size ? data.size : 0;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
