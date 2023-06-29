import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditProfileFormData, UserProfile } from '../../../api/types/user';
import { DEPARTMENTS_TEAMS_JOBS } from '../../../helpers/constants/departmentsTeamsJobTitles';
import { map, Observable, startWith } from 'rxjs';
import { MyErrorStateMatcher } from '../../app.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../api/services/user/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css'],
})
export class EditProfileDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profilePhoto: string | ArrayBuffer = 'assets/profile-photo-placeholder.png';
  departments: string[] = Object.keys(DEPARTMENTS_TEAMS_JOBS);
  teamsByDepartment: string[] = [];
  jobTitlesByTeam: string[] = [];
  filteredDepartments!: Observable<string[]>;
  filteredTeams!: Observable<string[]>;
  filteredJobTitles!: Observable<string[]>;
  matcher = new MyErrorStateMatcher();

  profilePhotoFormControl = new FormControl();
  previousExperienceFormControl = new FormControl(['']);
  skillsFormControl = new FormControl(['']);
  hobbiesFormControl = new FormControl(['']);
  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);
  departmentFormControl = new FormControl('', Validators.required);
  teamFormControl = new FormControl('', Validators.required);
  jobTitleFormControl = new FormControl('', Validators.required);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  editProfileForm = new FormGroup({
    profilePhoto: this.profilePhotoFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    department: this.departmentFormControl,
    team: this.teamFormControl,
    jobTitle: this.jobTitleFormControl,
    email: this.emailFormControl,
    previousExperience: this.previousExperienceFormControl,
    skills: this.skillsFormControl,
    hobbies: this.hobbiesFormControl,
  });
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserProfile }
  ) {
    this.emailFormControl.setValue(data.user.email);
    this.profilePhotoFormControl.setValue(data.user.profileImage);
    this.firstNameFormControl.setValue(data.user.firstName);
    this.lastNameFormControl.setValue(data.user.lastName);
    this.departmentFormControl.setValue(data.user.department);
    this.teamFormControl.setValue(data.user.team);
    this.jobTitleFormControl.setValue(data.user.jobTitle);
    this.previousExperienceFormControl.setValue(data.user.previousExperience);
    this.skillsFormControl.setValue(data.user.skills);
    this.hobbiesFormControl.setValue(data.user.hobbies);

    if (data.user.profileImage && data.user.profileImage.imageEncoded) {
      this.profilePhoto = data.user.profileImage.imageEncoded;
    }

    this.initializeDepartments();
    this.updateTeamsByDepartment(this.departmentFormControl.value);
    this.updateJobTitlesByTeam(this.teamFormControl.value);
    this.onDepartmentChange();
    this.onTeamChange();
  }

  ngOnInit() {}

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

  onUpdateProfile() {
    if (this.editProfileForm.value) {
      const formData: EditProfileFormData = {
        profilePhoto: this.profilePhotoFormControl.value,
        firstName: this.firstNameFormControl.value || '',
        lastName: this.lastNameFormControl.value || '',
        department: this.departmentFormControl.value || '',
        team: this.teamFormControl.value || '',
        jobTitle: this.jobTitleFormControl.value || '',
        email: this.emailFormControl.value || '',
        previousExperience: this.previousExperienceFormControl.value || [],
        skills: this.skillsFormControl.value || [],
        hobbies: this.hobbiesFormControl.value || [],
      };
      this.userService.updateProfile(formData).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.snackBar.open('Profile updated successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
        },
        error: (): void => {
          this.snackBar.open(
            `Profile update failed. Please try again.`,
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

  onCancel(): void {
    this.dialogRef.close();
  }

  addPreviousExperience(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const previousExperiences =
        this.previousExperienceFormControl.value || [];
      previousExperiences.push(value);
      this.previousExperienceFormControl.setValue(previousExperiences);
    }
    event.chipInput!.clear();
  }

  removePreviousExperience(previousExperience: string): void {
    const previousExperiences = this.previousExperienceFormControl.value || [];
    const index = previousExperiences.indexOf(previousExperience);
    if (index >= 0) {
      previousExperiences.splice(index, 1);
    }
    this.previousExperienceFormControl.setValue(previousExperiences);
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const skills = this.skillsFormControl.value || [];
      skills.push(value);
      this.skillsFormControl.setValue(skills);
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const skills = this.skillsFormControl.value || [];
    const index = skills.indexOf(skill);
    if (index >= 0) {
      skills.splice(index, 1);
    }
    this.skillsFormControl.setValue(skills);
  }

  addHobby(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const hobbies = this.hobbiesFormControl.value || [];
      hobbies.push(value);
      this.hobbiesFormControl.setValue(hobbies);
    }
    event.chipInput!.clear();
  }

  removeHobby(hobby: string): void {
    const hobbies = this.hobbiesFormControl.value || [];
    const index = hobbies.indexOf(hobby);
    if (index >= 0) {
      hobbies.splice(index, 1);
    }
    this.hobbiesFormControl.setValue(hobbies);
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

  private updateTeamsByDepartment(department: string | null) {
    if (department) {
      this.teamsByDepartment =
        Object.keys(DEPARTMENTS_TEAMS_JOBS[department]) || [];
    } else {
      this.teamsByDepartment = [];
    }
    this.filteredTeams = this.teamFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTeams(value || ''))
    );
  }

  private updateJobTitlesByTeam(team: string | null) {
    const department = this.departmentFormControl.value;
    if (team && department) {
      this.jobTitlesByTeam = DEPARTMENTS_TEAMS_JOBS[department][team] || [];
    } else {
      this.jobTitlesByTeam = [];
    }
    this.filteredJobTitles = this.jobTitleFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterJobTitles(value || ''))
    );
  }

  private initializeDepartments() {
    this.filteredDepartments = this.departmentFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDepartments(value || ''))
    );
  }

  private onDepartmentChange() {
    this.departmentFormControl.valueChanges.subscribe(department => {
      this.updateTeamsByDepartment(department);

      this.teamFormControl.setValue('');
      this.jobTitleFormControl.setValue('');
    });
  }

  private onTeamChange() {
    this.teamFormControl.valueChanges.subscribe(team => {
      this.updateJobTitlesByTeam(team);

      this.jobTitleFormControl.setValue('');
    });
  }
}
