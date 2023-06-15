import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() canGoBack: boolean = false;
  profilePhotoUrl: string = 'assets/portrait.jpg';

  onGoBack() {
    alert('onGoBack clicked');
  }

  onNavigateToNewsFeed() {
    alert('onNavigateToNewsFeed clicked');
  }

  onNavigateToSearchColleagues() {
    alert('onNavigateToSearchColleagues clicked');
  }

  onNavigateToAboutMe() {
    alert('onNavigateToAboutMe clicked');
  }

  onNavigateToAdminPanel() {
    alert('onNavigateToAdminPanel clicked');
  }

  onLogOut() {
    alert('onLogOut clicked');
  }
}
