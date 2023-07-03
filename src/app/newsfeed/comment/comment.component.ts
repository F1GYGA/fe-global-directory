import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;

  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';

  constructor() {}

  ngOnInit(): void {}
}
