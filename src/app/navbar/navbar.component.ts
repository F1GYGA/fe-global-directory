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

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isOnDashboardPage = this.router.url === '/';
    });

    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
        this.isAdmin = this.user?.role === 'ADMIN';
      });
    }
  }

  onGoBack() {
    this.location.back();
  }

  onNavigateToNewsFeed() {
    this.router.navigate(['']);
  }

  onNavigateToSearchColleagues() {
    this.router.navigate(['/search-colleagues']);
  }

  onNavigateToAboutMe() {
    this.router.navigate(['/about']);
  }

  onNavigateToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {},
      complete: (): void => {
        this.router.navigate(['/login']);
      },
    });
  }
}
