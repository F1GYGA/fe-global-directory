import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { LoginFormData, RegisterFormData } from '../../api/types/auth';
import { AuthService } from '../../api/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSignIn() {
    if (this.loginForm.valid) {
      const loginData: LoginFormData = this.loginForm.value as LoginFormData;

      this.authService.login(loginData.email, loginData.password).subscribe({
        next: response => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigate(['']);
          this.snackBar.open('You have successfully signed in.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
        },
        error: (): void => {
          this.snackBar.open(
            `Authentication failed. Please try again.`,
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
