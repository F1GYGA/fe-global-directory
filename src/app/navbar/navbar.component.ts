import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../api/services/auth/auth.service';
import { User } from '../../api/types/user';
import { UserService } from '../../api/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() isOnDashboardPage: boolean = false;
  profilePhotoPlaceholder: string = 'assets/profile-photo-placeholder.png';
  user: User | null = null;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isOnDashboardPage = this.router.url === '/';

    this.router.events.subscribe({
      next: (): void => {
        this.isOnDashboardPage = this.router.url === '/';
      },
    });

    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
        this.isAdmin = this.user?.role === 'ADMIN';
      });
    }
  }

  onGoBack(): void {
    this.location.back();
  }

  onNavigateToNewsFeed(): void {
    this.router.navigate(['']);
  }

  onNavigateToSearchColleagues(): void {
    this.router.navigate(['/search-colleagues']);
  }

  onNavigateToAboutMe(): void {
    this.router.navigate(['about', this.authService.getUserId()]);
  }

  onNavigateToAdminPanel(): void {
    this.router.navigate(['/admin-panel']);
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: (): void => {},
      complete: (): void => {
        this.router.navigate(['/login']);
      },
    });
  }
}
