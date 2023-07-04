import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post, PostFormData } from 'src/api/types/post';
import { PostService } from 'src/api/services/post/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { User } from '../../api/types/user';
import { AuthService } from '../../api/services/auth/auth.service';
import { UserService } from '../../api/services/user/user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
  animations: [
    trigger('detailOpen', [
      state(
        'closed, void',
        style({
          height: '0px',
          minHeight: '0',
          opacity: '0',
        })
      ),
      state('open', style({ height: '*', opacity: '1' })),
      transition(
        'open <=> closed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NewsfeedComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  postImage: string | null = null;
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';
  posts: Post[] = [];
  formState: string = 'closed';
  matcher = new MyErrorStateMatcher();
  textFormControl = new FormControl('', Validators.required);
  postImageFormControl = new FormControl();
  authUser!: User;
  isAdmin: boolean = false;
  isLoading: boolean = false;

  newPostForm = new FormGroup({
    text: this.textFormControl,
    postImage: this.postImageFormControl,
  });

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService
  ) {}

  resetNewPostForm(): void {
    this.textFormControl.reset();
    this.clearImage();
  }

  openNewPostForm(): void {
    if (this.formState === 'closed') {
      this.formState = 'open';
    } else this.formState = 'closed';
  }

  closeNewPostForm(): void {
    this.formState = 'closed';
    this.resetNewPostForm();
  }

  ngOnInit(): void {
    this.getPosts();
    this.getCurrentUserAndRole();
  }

  getCurrentUserAndRole(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.authUser = user;
        this.isAdmin = this.authUser?.role === 'ADMIN';
      });
    }
  }

  onFilterChange(
    filter?: 'personal' | 'manual' | 'joining' | 'promotion' | 'anniversary'
  ): void {
    if (filter) {
      if (filter === 'personal') {
        this.getPostsByUser();
      } else {
        this.getPostsByType(filter);
      }
    } else {
      this.getPosts();
    }
  }

  getPosts(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (posts: Post[]): void => {
        this.posts = posts;
      },
      error: (): void => {
        this.snackBar.open(
          `There was an error while loading data from the server.`,
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  getPostsByUser(): void {
    this.isLoading = true;
    const localStorageUserId = localStorage.getItem('userId');
    const userId = Number(localStorageUserId);
    this.postService.getPostsByUser(userId).subscribe({
      next: (postsByUser: Post[]): void => {
        this.posts = postsByUser;
      },
      error: (): void => {
        this.snackBar.open(
          `There was an error while loading data from the server.`,
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  getPostsByType(type: string): void {
    this.isLoading = true;
    this.postService.getPostsByType(type).subscribe({
      next: (postsByType: Post[]): void => {
        this.posts = postsByType;
      },
      error: (): void => {
        this.snackBar.open(
          `There was an error while loading data from the server.`,
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          }
        );
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });
  }

  clearImage(): void {
    this.postImage = null;
    this.postImageFormControl.setValue(null);
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  sharePost(): void {
    if (this.newPostForm.valid) {
      const formData: PostFormData = {
        text: this.textFormControl.value || '',
        postImage: this.postImageFormControl.value,
      };
      this.postService.createPost(formData).subscribe({
        next: () => {
          this.getPosts();
          this.closeNewPostForm();
          this.snackBar.open('Post created successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
        },
        error: (): void => {
          this.snackBar.open(
            `Failed to create post. Please try again.`,
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

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.postImage = reader.result as string;
        this.postImageFormControl.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }
}
