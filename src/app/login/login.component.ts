import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../app.component";
import {LoginFormData} from "../../api/types/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  matcher = new MyErrorStateMatcher();

  onSignIn() {
    if (this.loginForm.valid) {
      const loginData: LoginFormData = this.loginForm.value as LoginFormData;
      console.log(loginData);
    }
  }
}
