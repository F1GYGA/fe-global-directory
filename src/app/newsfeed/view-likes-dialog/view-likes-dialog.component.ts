import { Component, Inject, OnInit } from '@angular/core';
import { Like } from '../../../api/types/reaction';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-likes-dialog',
  templateUrl: './view-likes-dialog.component.html',
  styleUrls: ['./view-likes-dialog.component.css'],
})
export class ViewLikesDialogComponent implements OnInit {
  likes!: Like[];
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';

  constructor(
    public dialogRef: MatDialogRef<ViewLikesDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.likes = data.likes;
  }

  onNavigateToUserProfile(userId: number): void {
    this.onCloseLikesView();
    this.router.navigate(['/about', userId]);
  }

  onCloseLikesView(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
