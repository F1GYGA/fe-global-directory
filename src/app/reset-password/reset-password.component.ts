import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ResetPasswordFormData } from '../../api/types/auth';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../api/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  newPasswordFormControl = new FormControl('', [
    Validators.required,
    this.passwordValidator,
  ]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  resetPasswordForm = new FormGroup({
    newPassword: this.newPasswordFormControl,
    confirmPassword: this.confirmPasswordFormControl,
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.newPasswordFormControl.valueChanges.subscribe(() => {
      this.validateMatchingPasswords();
    });

    this.confirmPasswordFormControl.valueChanges.subscribe(() => {
      this.validateMatchingPasswords();
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid && this.token) {
      const passwordValue = this.resetPasswordForm.value.newPassword || '';
      const confirmPasswordValue =
        this.resetPasswordForm.value.confirmPassword || '';
      const resetPasswordData: ResetPasswordFormData = {
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
      };

      this.authService.resetPassword(resetPasswordData, this.token).subscribe({
        next: () => {
          this.resetPasswordForm.reset();
          this.snackBar.open('Password reset successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
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

  private validateMatchingPasswords() {
    const newPassword = this.newPasswordFormControl.value;
    const confirmPassword = this.confirmPasswordFormControl.value;

    if (newPassword !== confirmPassword) {
      this.confirmPasswordFormControl.setErrors({ passwordsDoNotMatch: true });
    } else {
      this.confirmPasswordFormControl.setErrors(null);
    }
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    const isLengthValid = value && value.length >= 8;
    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      isLengthValid;

    return passwordValid ? null : { passwordInvalid: true };
  }
}
