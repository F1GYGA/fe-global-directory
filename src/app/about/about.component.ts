import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { User } from 'src/api/types/user';
import { UserService } from 'src/api/services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  
  currentUser!: User;
  profilePhotoPlaceholder = 'path-to-placeholder-image.jpg';
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        (user: User) => {
          this.currentUser = user;
        },
        (error: any) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    }
  }

  onNavigateToLinkedIn() {
    alert('onNavigateToLinkedIn clicked');
  }

}