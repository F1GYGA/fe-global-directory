import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordFormData } from '../../api/types/auth';

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

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordData: ForgotPasswordFormData = this.forgotPasswordForm
        .value as ForgotPasswordFormData;
      console.log(forgotPasswordData);
    }
  }
}
