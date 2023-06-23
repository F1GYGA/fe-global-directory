import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../api/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() isOnDashboardPage: boolean = false;
  isAdmin: boolean;
  profilePhotoPlaceholder: string = 'assets/portrait.jpg';

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.isAdmin = Boolean(
      this.authService.isAuthenticated() &&
        this.authService.getUserRoles()?.includes('ADMIN')
    );
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isOnDashboardPage = this.router.url === '/';
    });
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
