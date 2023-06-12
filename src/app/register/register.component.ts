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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profilePhoto: string | ArrayBuffer = 'assets/profile-photo-placeholder.png';
  hidePassword: boolean = true;

  profilePhotoFormControl = new FormControl();
  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);
  departmentFormControl = new FormControl('', Validators.required);
  teamFormControl = new FormControl('', Validators.required);
  jobTitleFormControl = new FormControl('', Validators.required);
  employmentDateFormControl = new FormControl('', Validators.required);
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
    employmentDate: this.employmentDateFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  matcher = new MyErrorStateMatcher();

  departments: string[] = Object.keys(DEPARTMENTS_TEAMS_JOBS);
  teamsByDepartment: string[] = [];
  jobTitlesByTeam: string[] = [];
  filteredDepartments!: Observable<string[]>;
  filteredTeams!: Observable<string[]>;
  filteredJobTitles!: Observable<string[]>;

  ngOnInit() {
    this.initializeDepartments();
    this.initializeTeamsByDepartment();
    this.initializeJobTitlesByTeam();
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

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhoto = reader.result as string | ArrayBuffer;
        this.profilePhotoFormControl.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  private convertToFormData(registerData: RegisterFormData): FormData {
    const formData = new FormData();

    Object.entries(registerData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return formData;
  }

  onSignUp() {
    if (this.registerForm.valid) {
      const registerData: RegisterFormData = this.registerForm
        .value as RegisterFormData;
      const formData = this.convertToFormData(registerData);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    }
  }
}
