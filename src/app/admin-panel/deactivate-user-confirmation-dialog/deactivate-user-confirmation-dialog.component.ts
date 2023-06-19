import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deactivate-user-confirmation-dialog',
  templateUrl: './deactivate-user-confirmation-dialog.component.html',
  styleUrls: ['./deactivate-user-confirmation-dialog.component.css'],
})
export class DeactivateUserConfirmationDialogComponent implements OnInit {
  user: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
  }

  ngOnInit(): void {}
}
