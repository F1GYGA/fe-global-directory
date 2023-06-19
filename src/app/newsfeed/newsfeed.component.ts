import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLike() {
    alert('onLike clicked');
  }

  onComment() {
    alert('onComment clicked');
  }

  onNavigateToAboutMe() {
    alert('onNavigateToAboutMe clicked');
  }

}
