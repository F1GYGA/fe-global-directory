import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-activate-user-confirmation-dialog',
  templateUrl: './activate-user-confirmation-dialog.component.html',
  styleUrls: ['./activate-user-confirmation-dialog.component.css'],
})
export class ActivateUserConfirmationDialogComponent implements OnInit {
  user: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
  }

  ngOnInit(): void {}
}
