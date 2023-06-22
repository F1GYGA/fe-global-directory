import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { map, Observable, startWith } from 'rxjs';
import { RegisterFormData } from '../../api/types/auth';
import { DEPARTMENTS_TEAMS_JOBS } from '../../helpers/constants/departmentsTeamsJobTitles';
import { AuthService } from '../../api/services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  profilePhoto: string = 'assets/profile-photo-placeholder.png';
  hidePassword: boolean = true;
  maxEmploymentDate: Date;
  departments: string[] = Object.keys(DEPARTMENTS_TEAMS_JOBS);
  teamsByDepartment: string[] = [];
  jobTitlesByTeam: string[] = [];
  filteredDepartments!: Observable<string[]>;
  filteredTeams!: Observable<string[]>;
  filteredJobTitles!: Observable<string[]>;
  matcher = new MyErrorStateMatcher();

  profilePhotoFormControl = new FormControl();
  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);
  departmentFormControl = new FormControl('', Validators.required);
  teamFormControl = new FormControl('', Validators.required);
  jobTitleFormControl = new FormControl('', Validators.required);
  employmentDateFormControl = new FormControl('', [
    Validators.required,
    this.maxEmploymentDateValidator,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    this.passwordValidator,
  ]);

  registerForm = new FormGroup({
    profilePhoto: this.profilePhotoFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    department: this.departmentFormControl,
    team: this.teamFormControl,
    jobTitle: this.jobTitleFormControl,
    dateOfEmployment: this.employmentDateFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  constructor(
    private datePipe: DatePipe,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.maxEmploymentDate = new Date();
  }

  ngOnInit() {
    this.initializeDepartments();
    this.initializeTeamsByDepartment();
    this.initializeJobTitlesByTeam();
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhoto = reader.result as string;
        this.profilePhotoFormControl.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onSignUp() {
    if (this.registerForm.valid) {
      const formData: RegisterFormData = {
        profilePhoto: this.profilePhotoFormControl.value,
        firstName: this.firstNameFormControl.value || '',
        lastName: this.lastNameFormControl.value || '',
        department: this.departmentFormControl.value || '',
        team: this.teamFormControl.value || '',
        jobTitle: this.jobTitleFormControl.value || '',
        dateOfEmployment:
          this.datePipe.transform(
            this.employmentDateFormControl.value,
            'yyyy-MM-dd'
          ) || '',
        email: this.emailFormControl.value || '',
        password: this.passwordFormControl.value || '',
      };

      this.authService.register(formData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.snackBar.open('Registration successful.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
        },
        error: (): void => {
          this.snackBar.open(
            `Registration failed. Please try again.`,
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

  private filterDepartments(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departments.filter(department =>
      department.toLowerCase().includes(filterValue)
    );
  }

  private filterTeams(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamsByDepartment.filter(team =>
      team.toLowerCase().includes(filterValue)
    );
  }

  private filterJobTitles(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.jobTitlesByTeam.filter(jobTitle =>
      jobTitle.toLowerCase().includes(filterValue)
    );
  }

  private initializeDepartments() {
    this.filteredDepartments = this.departmentFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDepartments(value || ''))
    );
  }

  private initializeTeamsByDepartment() {
    this.departmentFormControl.valueChanges.subscribe(department => {
      if (department) {
        this.teamsByDepartment =
          Object.keys(DEPARTMENTS_TEAMS_JOBS[department]) || [];
        this.teamFormControl.setValue('');
      } else {
        this.teamsByDepartment = [];
        this.teamFormControl.setValue('');
      }
      this.filteredTeams = this.teamFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterTeams(value || ''))
      );
    });
  }

  private initializeJobTitlesByTeam() {
    this.teamFormControl.valueChanges.subscribe(team => {
      const department = this.departmentFormControl.value;
      if (team && department) {
        this.jobTitlesByTeam = DEPARTMENTS_TEAMS_JOBS[department][team] || [];
        this.jobTitleFormControl.setValue('');
      } else {
        this.jobTitlesByTeam = [];
        this.jobTitleFormControl.setValue('');
      }
      this.filteredJobTitles = this.jobTitleFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterJobTitles(value || ''))
      );
    });
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

  private maxEmploymentDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const isDateValid = selectedDate <= currentDate;

    return isDateValid ? null : { dateTooHigh: true };
  }
}
