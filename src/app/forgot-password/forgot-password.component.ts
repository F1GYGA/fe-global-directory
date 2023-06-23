import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordFormData } from '../../api/types/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../api/services/auth/auth.service';

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

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordData: ForgotPasswordFormData = this.forgotPasswordForm
        .value as ForgotPasswordFormData;

      this.authService
        .sendResetPasswordEmail(forgotPasswordData.email)
        .subscribe({
          next: () => {
            this.forgotPasswordForm.reset();
            this.snackBar.open(
              'A link to reset your password has been sent to your email.',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'success-snackbar',
              }
            );
          },
          error: (): void => {
            this.snackBar.open(
              `Something went wrong. Please try again.`,
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'error-snackbar',
              }
            );
          },
        });
    }
  }
}
