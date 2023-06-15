import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fe-global-directory';
  isAuthenticated: boolean;
  canGoBack: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
    this.isAuthenticated = this.checkIfAuthenticated();
    this.canGoBack = this.checkIfCanGoBack();
  }

  private registerIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'globe-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/globe.svg')
    );
  }

  private checkIfAuthenticated(): boolean {
    return true;
  }

  private checkIfCanGoBack(): boolean {
    return true;
  }
}
