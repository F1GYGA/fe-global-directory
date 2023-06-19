import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() canGoBack: boolean = false;
  isAdmin: boolean = true;
  // isAdmin: boolean = false;
  profilePhotoUrl: string = 'assets/portrait.jpg';

  constructor(private router: Router, private location: Location) {}

  onGoBack() {
    this.location.back();
  }

  onNavigateToNewsFeed() {
    this.router.navigate(['/news-feed']);
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

  onLogOut() {
    this.router.navigate(['/login']);
  }
}
