import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  reasonFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', []);
  registrationRequestRejectionForm = new FormGroup({
    reason: this.reasonFormControl,
    description: this.descriptionFormControl,
  });

  constructor(
    public dialogRef: MatDialogRef<UserRejectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    if (this.registrationRequestRejectionForm.valid) {
      this.dialogRef.close(this.registrationRequestRejectionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
