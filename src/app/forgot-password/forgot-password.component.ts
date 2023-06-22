import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordFormData } from '../../api/types/auth';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  forgotPasswordForm = new FormGroup({
    email: this.emailFormControl,
  });

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordData: ForgotPasswordFormData = this.forgotPasswordForm
        .value as ForgotPasswordFormData;
      console.log(forgotPasswordData);

      this.http.post('http://localhost:8080/sendEmail', { email: forgotPasswordData.email }, { responseType: 'text' }).subscribe(
        (response) => {
          console.log('Email sent successfully');
        },
        (error) => {
          console.error('Failed to send email!', error);
        }
      );

      this.snackBar.open(`Sending email to ${forgotPasswordData.email}`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar',
    });

      this.forgotPasswordForm.reset();
    }
  }
}
