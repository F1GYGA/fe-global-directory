import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-rejection-dialog',
  templateUrl: './user-rejection-dialog.component.html',
  styleUrls: ['./user-rejection-dialog.component.css'],
})
export class UserRejectionDialogComponent {
  rejectionReasons: string[] = [
    'Security Concerns',
    'Unverifiable Information',
    'Restricted Domain Email',
  ];

  selectedReason: string = '';
  additionalDetails: string = '';

  constructor(
    public dialogRef: MatDialogRef<UserRejectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close({
      selectedReason: this.selectedReason,
      additionalDetails: this.additionalDetails,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
