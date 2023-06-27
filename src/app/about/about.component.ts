import { Component, OnInit } from '@angular/core';
import { User } from 'src/api/types/user';
import { UserService } from 'src/api/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../api/services/auth/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isLoading: boolean = false;
  user!: User;
  isLoggedInUser: boolean = false;
  profilePhotoPlaceholder = 'assets/profile-photo-placeholder.png';

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  formatDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd MMMM yyyy') as string;
    } else {
      return 'N/A';
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          const userId: string | null = params.get('id');
          this.isLoggedInUser = this.authService.getUserId() === Number(userId);
          if (userId) {
            this.loadUserData(userId);
          }
        })
      )
      .subscribe();
  }

  loadUserData(id: string): void {
    this.isLoading = true;
    const userId: number = Number(id);
    this.userService.getUserById(userId).subscribe({
      next: (userData: User): void => {
        this.user = userData;
      },
      error: (): void => {
        this.snackBar.open(
          'Failed to load user data, please try again later.',
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

  onEdit(): void {
    alert('onEdit clicked');
  }
}
