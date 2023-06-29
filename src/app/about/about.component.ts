import { Component, OnInit } from '@angular/core';
import { User } from 'src/api/types/user';
import { UserService } from 'src/api/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../api/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isLoading: boolean = false;
  user!: User;
  isAdmin: boolean = false;
  isAuthenticatedUser: boolean = false;
  profilePhotoPlaceholder: string = 'assets/profile-photo-placeholder.png';

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  navigateToPreviousUser(): void {
    if (this.user && this.user.id) {
      const previousUserId: number = this.user.id - 1;
      this.checkAndNavigate(previousUserId, -1);
    }
  }

  navigateToNextUser(): void {
    if (this.user && this.user.id) {
      const nextUserId: number = this.user.id + 1;
      this.checkAndNavigate(nextUserId, 1);
    }
  }

  checkAndNavigate(userId: number, increment: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (userData: User): void => {
        if (userData.approved && userData.active) {
          this.router.navigate(['/about', userId]);
        } else {
          this.checkAndNavigate(userId + increment, increment);
        }
      },
      error: () => {
        this.snackBar.open('No more users found.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        });
      },
    });
  }

  formatDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd MMMM yyyy') as string;
    } else {
      return 'N/A';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const userId: string | null = params.get('id');
        const authenticatedUserId: number | null = this.authService.getUserId();

        if (authenticatedUserId !== null) {
          this.isAuthenticatedUser = authenticatedUserId === Number(userId);
          this.userService.getUserById(authenticatedUserId).subscribe({
            next: (user: User): void => {
              this.isAdmin = user?.role === 'ADMIN';
            },
          });
        }

        if (userId) {
          this.loadUserData(userId);
        }
      },
    });
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
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      maxHeight: '768px',
      width: '100%',
      maxWidth: '768px',
      data: { user: this.user },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === true) {
          this.loadUserData(this.user.id.toString());
        }
      }
    });
  }
}
