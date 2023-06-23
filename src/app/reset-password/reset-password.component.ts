import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from '../../api/types/auth';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
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
    private http: HttpClient
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log(token);
    });
    this.newPasswordFormControl.valueChanges.subscribe(() => {
      this.validateMatchingPasswords();
    });

    this.confirmPasswordFormControl.valueChanges.subscribe(() => {
      this.validateMatchingPasswords();
    });
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

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      console.log('onResetPassword method called');
      const newPasswordValue = this.resetPasswordForm.value.newPassword || '';
      const resetPasswordData: ResetPasswordFormData = {
        newPassword: newPasswordValue,
        token: this.route.snapshot.queryParams['token']
      };
      console.log(resetPasswordData);

      this.http.post('http://localhost:8080/reset', resetPasswordData)
        .subscribe(
          response => {
            console.log('Password reset successful:', response);
          },
          error => {
            console.error('Password reset failed:', error);

          }
        );
    }
  }
}
