import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-user-comment',
  templateUrl: './auth-user-comment.component.html',
  styleUrls: ['./auth-user-comment.component.css'],
})
export class AuthUserCommentComponent implements OnInit {
  @Input() comment: any;

  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';

  constructor() {}

  ngOnInit(): void {}
}
