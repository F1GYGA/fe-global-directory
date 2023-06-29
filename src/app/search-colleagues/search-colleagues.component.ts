import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  searchKeywordFilter = new FormControl();
  pageSizes = [10, 30, 50];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(
      this.searchKeywordFilter.valueChanges,
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var filterValue =
            this.searchKeywordFilter.value == null
              ? ''
              : this.searchKeywordFilter.value;
          return this.userService
            .getFilteredUsers(filterValue, 10, this.paginator.pageIndex)
            .pipe(catchError(() => observableOf(null)));
        })
      )
      .subscribe(data => {
        console.log(data?.userProfileDTOS);
        this.data = data?.userProfileDTOS ? data.userProfileDTOS : [];
        this.resultsLength = data?.size ? data.size : 0;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
